import { Ai } from '@cloudflare/ai';

export const config = {
  runtime: 'edge',
}

function error(message = 'Not found', status = 404, more = {}) {
  return new Response(
    JSON.stringify({ message: message, ...more }),
    { status: status, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
}

export default async function handler(req, res, ctx) {
  // Only POST requests
  if (req.method !== 'POST') {
    return error();
  }

  // Only complete data
  const data = await req.json();
  if (!data?.code) {
    return error('Code required', 400);
  }

  // Answer the query
  const ai = new Ai(process.env.AI);
  let input = {
    messages: [
      { role: 'system', content: 'You are a helpful programming assistant fluent in all popular high-level programming languages.'},
      { role: 'user', content: `
Re-write the following code to meet common formatting standards of the respective programming language and optimize the commands for more performance and readability. Additionally, try to fix obvious problems, for example incomplete function signatures.
Furthermore, when encountering any uncertainties, make me aware of them using inline comments in the code.
In your reply, please enclose the updated code with #**********# before and after.
The following is the code to improve:

${data.code}`
      },
    ]
  };
  const response = await ai.run('@hf/thebloke/codellama-7b-instruct-awq', input);
  var output = response?.response || '';

  // Extract code and drop notes and remarks
  const codeRegExp = /\#\*{10}\#\s*(.*?)\s*\#\*{10}\#/s;
  const match = output.match(codeRegExp);
  if (match == null || match.length < 2)
    return error('Internal error', 500, { details: 'Could not extract code from: ' + output });
  output = match[1];

  if (!output) {
    return error('Internal error', 500);
  }

  // Return updated code
  return new Response(
    JSON.stringify({ code: output }),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }
  );
}

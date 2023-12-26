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
Re-write the following code to meet common formatting standards of the respective programming language and optimize the commands for more performance and readability. Additionally, try to fix obvious problems, for example incomplete function signatures. For any uncertainties add inline comments to notify the user. Please provide your reply formatted as JSON, where the updated code is supplied in the key 'code' and all notes, comments, and remarks are collected in the field 'notes'. Do not add text outside of the JSON format. Escape any newlines and quotes in the JSON values with a backslash. The following is the code to improve:

${data.code}`
      },
    ]
  };
  const response = await ai.run('@hf/thebloke/codellama-7b-instruct-awq', input);
  var output = response?.response || '';

  // Drop notes and remarks
  const posEnd = output.search(/",\s*"notes":\s*("|\[|\{)/);
  if (posEnd !== -1)
    output = output.substring(0, posEnd) + '"\n}';

  try {
    const outputJson = JSON.parse(output);
    output = outputJson.code;
  } catch (err) {
    return error('Internal error', 500, { details: output + '\n\n' + err });
  }

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

export const config = {
  runtime: 'edge',
}

export default function handler(req) {
  const format = {
    schemaVersion: 1,
    label: 'pwa',
    message: 'online',
    color: '#4c1',
    logo: 'cloudflare',
  };
  return new Response(
    JSON.stringify(format),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }
  );
}

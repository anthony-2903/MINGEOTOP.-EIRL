const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY;

function json(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    json(response, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.authorization;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    json(response, 401, { ok: false, error: 'Unauthorized' });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    json(response, 500, {
      ok: false,
      error: 'Supabase environment variables are missing',
    });
    return;
  }

  const endpoint = new URL('/rest/v1/project_sectors', SUPABASE_URL);
  endpoint.searchParams.set('select', 'id');
  endpoint.searchParams.set('is_active', 'eq.true');
  endpoint.searchParams.set('limit', '1');

  const supabaseResponse = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
  });

  if (!supabaseResponse.ok) {
    json(response, 502, {
      ok: false,
      error: 'Supabase heartbeat failed',
      status: supabaseResponse.status,
    });
    return;
  }

  json(response, 200, {
    ok: true,
    checkedAt: new Date().toISOString(),
  });
}

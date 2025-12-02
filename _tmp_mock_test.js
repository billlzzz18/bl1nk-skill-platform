const { spawn } = require('child_process');
const path = require('path');

async function waitForServer(server) {
  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 5000);
    server.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      process.stdout.write(text);
      if (text.includes('Listening on port')) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  let body;
  try {
    body = await response.json();
  } catch (error) {
    body = await response.text();
  }
  return { status: response.status, body };
}

async function main() {
  const mockDir = path.resolve(__dirname, 'specs/main/generated/mock-server');
  const server = spawn(process.execPath, ['index.js'], {
    cwd: mockDir,
    env: { ...process.env, PORT: '8081' },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  server.stderr.on('data', (chunk) => process.stderr.write(chunk.toString()));

  await waitForServer(server);

  const baseUrl = 'http://localhost:8081/v1';
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const authHeaders = { ...defaultHeaders, Authorization: 'Bearer mock-token' };

  const scenarios = [
    {
      name: 'registerUser',
      run: () => fetchJson(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: 'dev@example.com',
          password: 'secret123',
          name: 'Dev User',
        }),
      }),
    },
    {
      name: 'loginUser',
      run: () => fetchJson(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: 'dev@example.com',
          password: 'secret123',
        }),
      }),
    },
    {
      name: 'getCurrentUser',
      run: () => fetchJson(`${baseUrl}/auth/me`, {
        method: 'GET',
        headers: { Authorization: 'Bearer mock-token' },
      }),
    },
    {
      name: 'listWorkspaces',
      run: () => fetchJson(`${baseUrl}/workspaces?page=1&perPage=5`, {
        method: 'GET',
        headers: { Authorization: 'Bearer mock-token' },
      }),
    },
    {
      name: 'createWorkspace',
      run: () => fetchJson(`${baseUrl}/workspaces`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          name: 'Mock Workspace',
          description: 'Created via automated mock test',
        }),
      }),
    },
    {
      name: 'listSkills',
      run: () => fetchJson(`${baseUrl}/workspaces/ws_123/skills`, {
        method: 'GET',
        headers: { Authorization: 'Bearer mock-token' },
      }),
    },
  ];

  const results = [];
  try {
    for (const scenario of scenarios) {
      try {
        const outcome = await scenario.run();
        results.push({ name: scenario.name, ...outcome });
      } catch (error) {
        results.push({ name: scenario.name, error: error.message });
      }
    }
  } finally {
    server.kill();
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

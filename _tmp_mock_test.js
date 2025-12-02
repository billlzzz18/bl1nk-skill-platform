const { spawn } = require('child_process');
const path = require('path');

async function main() {
  const mockDir = path.resolve(__dirname, 'specs/main/generated/mock-server');
  const server = spawn(process.execPath, ['index.js'], {
    cwd: mockDir,
    env: { ...process.env, PORT: '8081' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', (chunk) => process.stdout.write(chunk.toString()));
  server.stderr.on('data', (chunk) => process.stderr.write(chunk.toString()));

  await new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(), 2000);
    server.stdout.on('data', (chunk) => {
      if (chunk.toString().includes('Listening on port')) {
        clearTimeout(timeout);
        resolve();
      }
    });
  });

  try {
    const response = await fetch('http://localhost:8081/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'dev@example.com', password: 'secret123', name: 'Dev User' }),
    });
    const body = await response.json();
    console.log(JSON.stringify({ status: response.status, body }, null, 2));
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

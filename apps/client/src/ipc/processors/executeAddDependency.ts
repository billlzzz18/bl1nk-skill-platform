import { db } from "../../db";
import { messages } from "../../db/schema";
import { eq } from "drizzle-orm";
import { Message } from "../ipc_types";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const execFilePromise = promisify(execFile);

export async function executeAddDependency({
  packages,
  message,
  appPath,
}: {
  packages: string[];
  message: Message;
  appPath: string;
}) {
  let installResults = "";

  try {
    const { stdout, stderr } = await execFilePromise(
      process.platform === "win32" ? "pnpm.cmd" : "pnpm",
      ["add", ...packages],
      { cwd: appPath, shell: false }
    );
    installResults = stdout + (stderr ? `\n${stderr}` : "");
  } catch (_pnpmErr: any) {
    try {
      const { stdout, stderr } = await execFilePromise(
        process.platform === "win32" ? "npm.cmd" : "npm",
        ["install", "--legacy-peer-deps", ...packages],
        { cwd: appPath, shell: false }
      );
      installResults = stdout + (stderr ? `\n${stderr}` : "");
    } catch (npmErr: any) {
      installResults = npmErr.message || String(npmErr);
    }
  }

  // Update the message content with the installation results
  const updatedContent = message.content.replace(
    new RegExp(
      `<bl1nk-add-dependency packages="${packages.join(
        " ",
      )}">[^<]*</bl1nk-add-dependency>`,
      "g",
    ),
    `<bl1nk-add-dependency packages="${packages.join(
      " ",
    )}">${installResults}</bl1nk-add-dependency>`,
  );

  // Save the updated message back to the database
  await db
    .update(messages)
    .set({ content: updatedContent })
    .where(eq(messages.id, message.id));
}

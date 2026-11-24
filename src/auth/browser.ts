/**
 * Open a URL in the system browser.
 *
 * Windows: `cmd /c start` truncates URLs at "&" (cmd metacharacter) —
 * rundll32 hands the URL to the default browser verbatim. Uses
 * `child_process.spawn` so it works under both Node and Bun.
 */
import { spawn } from "node:child_process"

export function openBrowser(url: string): void {
  const [bin, args]: [string, string[]] =
    process.platform === "win32"
      ? ["rundll32", ["url.dll,FileProtocolHandler", url]]
      : process.platform === "darwin"
        ? ["open", [url]]
        : ["xdg-open", [url]]
  const child = spawn(bin, args, { stdio: "ignore", detached: true })
  child.unref()
}

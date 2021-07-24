import fs from "fs";

export async function readLines(filepath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readFile(filepath, { encoding: "utf-8" }, (err, buffer) => {
      if (err) return reject(err);
      resolve(
        buffer
          .toString()
          .split(/\r?\n/)
          .map((line) => line.replace(/\r?\n/, ""))
      );
    });
  });
}

export async function writeLines(lines: string[], filepath: string) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filepath, lines.join("\r\n"), { encoding: "utf-8" }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

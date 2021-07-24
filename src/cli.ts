#!/usr/bin/env node

import { program } from "commander";
import { readLines, writeLines } from "./util/fs.util";
import { parseSRT } from "./util/srt.parser";
import { zahirify } from "./zahirify";

// prettier-ignore
program.name("zahirify")
.version("0.0.1")
.argument("<srt-path>", "Path to the SRT file")
.option("-N, --no-bundle-number", "Excludes line numbers on the output txt file")
.action(srtPath => zahirifySRT(srtPath));

async function zahirifySRT(srtPath: string) {
  try {
    const options = program.opts();
    const lines = await readLines(srtPath);
    const srt = parseSRT(lines);
    const zahirifed = zahirify(srt);
    await writeLines(
      zahirifed.stringify(options.bundleNumber),
      srtPath.replace(/\.srt$/, ".txt")
    );
  } catch (err) {
    console.log("Something went wrong...");
    console.log(err)
  }
}

program.parse(process.argv);

import { splitArray } from "./core.util";

export class SRT {
  public nodes: SRTNode[] = [];
}

export class SRTNode {
  constructor(
    public no: number,
    public interval: string,
    public text: string
  ) {}
}

export function parseSRT(lines: string[]) {
  const srt = new SRT();

  splitArray(lines, (line) => line === "").forEach((part) => {
    const [no, interval, ...lines] = part;
    if (no !== undefined) {
      const node = new SRTNode(no, interval, lines.join(" "));
      srt.nodes.push(node);
    }
  });

  return srt;
}

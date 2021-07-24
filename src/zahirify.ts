import { SRT, SRTNode } from "./util/srt.parser";

export class ZahirifiedSRT {
  public bundles: SRTNodeBundle[] = [];

  public stringify(withNo = true) {
    const lines = [];

    this.bundles.forEach((bundle) => {
      const firstNode = bundle.srtNodes[0];
      const lastNode = bundle.srtNodes[bundle.srtNodes.length - 1];

      const bundledLine = bundle.srtNodes
        .map((node) => node.text.replace(/\.\.\.$/, "").replace(/^\.\.\./, ""))
        .join(" ");

      if (withNo) {
        const no =
          firstNode === lastNode
            ? `${firstNode.no}.`
            : `${firstNode.no}-${lastNode.no}.`;

        lines.push(`${no} ${bundledLine}`);
      } else {
        lines.push(bundledLine);
      }
    });

    return lines;
  }
}

export class SRTNodeBundle {
  public srtNodes: SRTNode[] = [];
}

export function zahirify(srt: SRT) {
  const zahirified = new ZahirifiedSRT();

  let bundle = new SRTNodeBundle();
  srt.nodes.forEach((node) => {
    bundle.srtNodes.push(node);
    if (!node.text.endsWith("...")) {
      zahirified.bundles.push(bundle);
      bundle = new SRTNodeBundle();
    }
  });

  return zahirified;
}

import {TurnFactory} from './TurnFactory';
import {PgnRecord} from './PgnRecord';

export class PgnFactory {
  static fromString(pgn: string): PgnRecord {
    const metadata = pgn.match(/\[(.+?)]/g);
    const md = metadata?.map(m => PgnFactory.parseMetadata(m)) || [];
    const mdObject = md.reduce((acc, curr) => ({...acc, ...curr}), {});
    const turnsNotation = pgn.replace(/\[(.*?)\]/g, '').trim();
    const turns = TurnFactory.fromTurns(turnsNotation);
    return new PgnRecord({
      ...mdObject,
      turns,
    });
  }
  private static parseMetadata(metadata: string) {
    const match = metadata.matchAll(/(?<key>[^"]+)"(?<val>.+)"/g);
    const data: Record<string, string> = {};
    for (const m of match) {
      const key = m.groups?.key;
      const val = m.groups?.val;
      if (key && val) data[key.replace('[', '').toLowerCase().trim()] = val;
    }
    return data;
  }
}

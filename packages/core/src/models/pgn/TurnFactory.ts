import _ from 'lodash';

import {PgnTurn} from './PgnTurn';

export class TurnFactory {
  static fromString(turnNotation: string): PgnTurn {
    let result = '';
    if (turnNotation.includes('1-0')) {
      result = '1-0';
    } else if (turnNotation.includes('0-1')) {
      result = '0-1';
    } else if (turnNotation.includes('1/2-1/2')) {
      result = '1/2-1/2';
    }
    const normalizedTurn = turnNotation.replace(result, '').trim();
    const matches = normalizedTurn.matchAll(
      /(?<number>\d+)\.\s(?<white>\S+)\s(?<black>\S*)/gi
    );
    const match = matches.next();
    const number = match?.value?.groups?.number;
    const white = match?.value?.groups?.white;
    const black = match?.value?.groups?.black;
    if (!number) {
      throw new Error('Invalid turn');
    }
    return new PgnTurn(parseInt(number), white, black, result);
  }

  static fromTurns(moves: string): PgnTurn[] {
    const matches = moves.matchAll(/(?<turn>\d+\.\s\S+\s\S+)\s?/g) || [];
    const turns = _.compact([...matches].map(m => m.groups?.turn));
    return turns.map(turn => TurnFactory.fromString(turn));
  }
}

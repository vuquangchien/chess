import {Move} from '../Move';

export interface MovePolicy {
  isMoveValid(move: Move): string | null;
}

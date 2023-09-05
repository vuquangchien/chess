import {Move} from '../moves/Move';

export interface MovePolicy {
  isMoveValid(move: Move): string | null;
}

import {IEngine} from './IEngine';

export class AsciiEngine implements IEngine {
  renderBox(options: {background: string; text: string}): string {
    const {background, text} = options;
    return (background === '#000' ? '■' : '□') + text;
  }
}

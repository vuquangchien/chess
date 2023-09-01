import {IEngine} from './IEngine';
import {AsciiEngine} from './AsciiEngine';
import {Html5CanvasEngine} from './Html5CanvasEngine';

export class EngineFactory {
  public static createEngine(
    name: string,
    options?: {
      canvas?: HTMLCanvasElement;
    }
  ): IEngine {
    if (name === 'ascii') return new AsciiEngine();
    if (name === 'html5-canvas') return new Html5CanvasEngine(options?.canvas!);
    throw new Error('Unknown engine');
  }
}

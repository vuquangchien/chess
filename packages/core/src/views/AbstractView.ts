import {IView} from '../framework/IView';
import {IEngine} from './IEngine';

export abstract class AbstractView<T> implements IView<T> {
  engine!: IEngine;
  children: AbstractView<unknown>[] = [];
  controller: T;

  public constructor(controller: T) {
    this.children = [];
    this.controller = controller;
    this.init();
  }
  init(): void {}

  setEngine(engine: IEngine): void {
    this.engine = engine;
    this.children.forEach(child => child.setEngine(engine));
  }
  addChild(child: AbstractView<unknown>): void {
    this.children.push(child);
  }

  addChildren(children: AbstractView<unknown>[]): void {
    this.children.push(...children);
  }

  renderChildren(): string {
    let result = '';
    for (const child of this.children) {
      result += child.render();
    }
    return result;
  }

  abstract render(): string;
}

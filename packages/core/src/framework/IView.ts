export interface IView<IViewController> {
  controller?: IViewController | null;
  render(): string;
}

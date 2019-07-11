export interface Header {
  title?: string;
  buttonText?: string;
}

export class HeaderModel implements Header {

  public title?: string;
  public buttonText?: string;

  constructor(
    title?: string,
    buttonText?: string,
  ) {
    this.title = title;
    this.buttonText = buttonText;
  }
}

export interface IEmailTemplate {
  getHtml(): string;
  getText(): string;
  getSubject(): string;
}

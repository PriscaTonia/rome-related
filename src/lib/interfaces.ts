export interface ILogParams {
  level: string;
  message: string;
  label: string;
  timestamp: string;
  stack: string;
}

export interface IEmail {
  to: string;
  from: string;
  html: string;
  subject: string;
}

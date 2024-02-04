export const client = (input: string | URL | Request, init?: RequestInit) =>
  fetch(`${process.env.API_URL}${input}`, init);

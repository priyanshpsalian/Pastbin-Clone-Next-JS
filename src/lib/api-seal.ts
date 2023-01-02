// Using BASE64 for decoding and encoding user tokens.

const sealAPI = (token: string) => {
  return Buffer.from(token, 'utf-8').toString('base64');
};

const unsealAPI = (token: string) => {
  return Buffer.from(token, 'base64').toString('ascii');
};

export { sealAPI, unsealAPI };

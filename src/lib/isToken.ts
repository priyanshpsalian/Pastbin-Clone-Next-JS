const isTokenPublic = (token: string): boolean => {
  return token === process.env.FAUNADB_LCLPASTE_PUBLIC_KEY;
};

export { isTokenPublic };

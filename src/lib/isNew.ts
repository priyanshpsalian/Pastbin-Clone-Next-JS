// checks if date is in between 24hrs
export const isNew = (d: string): boolean => {
  const today = new Date().getTime();
  const date = new Date(d).getTime();

  if (today - date < 86400000) {
    return true;
  }

  return false;
};

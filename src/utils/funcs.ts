// return the id from `user.sub`
function getSubId(sub: string): string {
  return sub.split('|')[1];
}

export { getSubId };

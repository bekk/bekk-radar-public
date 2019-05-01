export default (matchedRoutes) => {
  return matchedRoutes.reduce((prev, cur) => cur.status || prev, null);
};

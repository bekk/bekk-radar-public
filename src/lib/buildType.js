export default (radar, category, point) => {

  if(point) {
    return 'article';
  } else if (category) {
    return 'category';
  } else if (radar) {
    return 'website';
  }
  return 'website';
};

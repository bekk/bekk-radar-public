export default (radar, category, point) => {
  if (point) {
    return point.tags.map(tag => tag).join(',');
  } else if (category) {
    return category.title;
  } else if (radar) {
    return radar.tags.map(tag => tag).join(',');
  }
  return 'Bekk Open Radar';
};

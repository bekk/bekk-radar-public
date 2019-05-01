export default (radar, category, point) => {

  if(point) {
    return `${point.title} (${category.title}) | Bekk`;
  } else if (category) {
    return `${category.title} | Bekk`;
  } else if (radar) {
    return `${radar.title} | Bekk`;
  }
  return 'Radar | Bekk';
};

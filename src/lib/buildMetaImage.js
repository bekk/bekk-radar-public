import { getImageUrl, getCoverImage } from '../content';

export default (default_image, radar, category, point) => {

  if(point) {
    const image_from_point = getImageUrl(radar.id, point.id);
    if(image_from_point && typeof image_from_point === 'string' ){
      return image_from_point;
    }
  } else if (category) {
    const image_from_category = getCoverImage(category.radarId);
    if(image_from_category && typeof image_from_category === 'string' ){
      return image_from_category;
    }
  } else if (radar) {
    const image_from_radar = getCoverImage(radar.id);
    if(image_from_radar && typeof image_from_radar === 'string' ){
      return image_from_radar;
    }
  }
  return default_image;
};

// virtualPath can be something like `/radar`
// if hosted on `open.bekk.no/radar`
import virtualPath from '../config/virtualPath';

export function buildUrlToIndex(){
  return `${virtualPath}/`;
}

export function buildUrl(radar, category, point){
  if(point) {
    return buildUrlToPoint(point);
  } else if (category) {
    return buildUrlToCategory(category.radarId, category.id);
  } else if (radar) {
    return buildUrlToRadar(radar);
  }
  return buildUrlToIndex();
}

export function buildUrlToRadar(radar){
  return `${virtualPath}/${radar.id}`;
}

export function buildUrlToCategory(radarId, categoryId){
  return `${virtualPath}/${radarId}/${categoryId}`;
}

export function buildUrlToPoint(point) {
  return `${virtualPath}/${point.radarId}/${point.categoryId}/${point.id}`;
}

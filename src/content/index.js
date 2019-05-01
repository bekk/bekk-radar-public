//this file includes all radars indexed by directory name
const _ = require('lodash');
const radarFiles = require.context('./', true, /radar\.yml$/);

const radarArray = radarFiles.keys().map(key => (
  radarFiles(key)
));

let radars = {};
radarArray.forEach(radarContainer => radars[radarContainer.id] = radarContainer);

export default radars;

//require all images as well
const imageFiles = require.context('./', true, /\.(jpg|jpeg|png|svg)$/);
const imagePaths = imageFiles.keys();

export function getImageUrl(radarId, pointId) {
  const pattern = new RegExp(`^./${radarId}/points/${pointId}\\.(jpg|jpeg|png|svg)$`);
  const image = _.find(imagePaths, p => pattern.test(p));
  return image && imageFiles(image);
}

export function getCoverImage(radarId) {
  const pattern = new RegExp(`^./${radarId}/cover\\.(jpg|jpeg|png|svg)$`);
  const image = _.find(imagePaths, p => pattern.test(p));
  return image && imageFiles(image);
}

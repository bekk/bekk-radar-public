import each from 'lodash/collection/each';
import mapValues from 'lodash/object/mapValues';

export default function(categories, pointIds){
  const pointsPerCategory = mapValues(categories, category => {
    let count = 0;
    each(category.points, point => {
      each(pointIds, pointId => {
        if(pointId === point.id){
          ++count;
        }
      });
    });
    return count;
  });
  return pointsPerCategory;
}

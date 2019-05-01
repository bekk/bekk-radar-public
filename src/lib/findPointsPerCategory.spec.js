/*eslint-env node, mocha */
/*global expect */
import findNumberOfPointsPerCategory from './findNumberOfPointsPerCategory';

describe('findPointsPerCategory', () => {
  it('should return the correct number of points', () => {
    const categories = {
      forsta: {
        points: {
          guerillatesting: {
            id: 'guerillatesting'
          }
        }
      },
      skape: {
        points: {
          sketch: {
            id: 'sketch'
          },
          comet: {
            id: 'comet'
          }
        }
      },
      male: {
        points: {
          lala: {
            id: 'lala'
          }
        }
      }
    };
    const pointIds = ['guerillatesting', 'comet'];

    const result = findNumberOfPointsPerCategory(categories, pointIds);

    expect(result).to.deep.equal({
      forsta: 1,
      skape: 1,
      male: 0
    });
  });
});

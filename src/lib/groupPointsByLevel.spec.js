/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
import groupPointsByLevel from './groupPointsByLevel.js';

describe('groupPointsByLevel', () => {
  it('should create groups with the correct number of points in each', () => {
    const levels = [
      { title: 'Bruk', radius: '0.5' },
      { title: 'Vurder', radius: '0.75' },
      { title: 'Avstå', radius: '1' }
    ];
    const points = {
      go: {
        title: 'Go',
        score: 0.65
      },
      react: {
        title: 'React',
        score: 0.10
      },
      scala: {
        title: 'Scala',
        score: 0.05
      },
      objc: {
        title: 'Objective C',
        score: 0.85
      }
    };

    const groupedPoints = groupPointsByLevel(points, levels);

    expect(groupedPoints['Bruk'].length).to.equal(2);
    expect(groupedPoints['Bruk'][0].score).to.be.lessThan(groupedPoints['Bruk'][1].score);
    expect(groupedPoints['Vurder'].length).to.equal(1);
    expect(groupedPoints['Avstå'].length).to.equal(1);
  });
});

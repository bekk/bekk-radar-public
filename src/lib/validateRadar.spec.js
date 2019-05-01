/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
import validateRadar from './validateRadar';

describe('validateRadar', () => {
  it('should fail for a radar without title', () => {
    const radar = {
      categories: []
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(false);
    expect(result.errors[0].params.key).to.equal('title');
  });

  it('should fail with no categories', () => {
    const radar = {
      title: 'testradar'
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(false);
    expect(result.errors[0].params.key).to.equal('categories');
  });

  it('should fail for category with no title', () => {
    const radar = {
      title: 'testradar',
      categories: {
        languages: {
        }
      }
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(false);
    expect(result.errors[0].params.key).to.equal('title');
  });

  it('should pass for a simple valid radar', () => {
    const radar = {
      title: 'testradar',
      categories: {
        languages: {
          title: 'testradar',
          points: {
            go: {
              title: 'Go',
              score: 0.5,
              tags: ['google', 'language']
            }
          }
        }
      }
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(true);
  });

  it('should fail when score is missing from points', () => {
    const radar = {
      title: 'testradar',
      categories: {
        languages: {
          title: 'testradar',
          points: {
            go: {
              title: 'Go, programming language by google'
            }
          }
        }
      }
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(false);
    expect(result.errors[0].params.key).to.equal('score');
  });

  it('should fail when tags are incorrect type', () => {
    const radar = {
      title: 'testradar',
      categories: {
        languages: {
          title: 'testradar',
          points: {
            go: {
              title: 'Go, programming language by google',
              score: 0.5,
              tags: [1,2,3]
            }
          }
        }
      }
    };
    const result = validateRadar(radar);
    expect(result.valid).to.equal(false);
  });
});

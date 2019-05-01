/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
import validateRadar from '../lib/validateRadar';
import radarContainers from '.';
import map from 'lodash/collection/map';

function formatErrors(errors) {
  return errors.map(e => `${e.message} at ${e.dataPath}`).join('\n');
}

describe('content', () => {
  it('all radars should validate according to schema', () => {
    const results = map(radarContainers, radar => validateRadar(radar));
    results.map(r => expect(r.valid).to.equal(true, `\n${formatErrors(r.errors)}\n`));
  });
});

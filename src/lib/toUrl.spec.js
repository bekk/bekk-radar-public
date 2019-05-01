/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
import toUrl from './toUrl';

describe('string to url conversion', () => {
  it('should handle id\'s that are already safe', () => {
    expect(toUrl('guerillatesting')).to.equal('guerillatesting');
  });

  it('should convert spaces into hyphens', () => {
    expect(toUrl('impact mapping')).to.equal('impact-mapping');
    expect(toUrl('impact  mapping')).to.equal('impact-mapping');
  });

  it('should trim strings', () => {
    expect(toUrl(' impact')).to.equal('impact');
    expect(toUrl('impact  \t')).to.equal('impact');
  });

  it('handle convert æøå into similar characters', () => {
    expect(toUrl('grønn og rød fase')).to.equal('gronn-og-rod-fase');
    expect(toUrl('blåbærpai')).to.equal('blabarpai');
  });

  it('removes invalid chars', () => {
    expect(toUrl('<script>alert("hei");</script>')).to.equal('scriptalerthei-script');
  });

  it('collapses dashes', () => {
    expect(toUrl('l;/ o ; l')).to.equal('l-o-l');
  });

  it('converts to lower case', () => {
    expect(toUrl('Adobe Comet')).to.equal('adobe-comet');
  });
});

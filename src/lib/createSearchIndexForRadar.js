'use strict';

const lunr = require('lunr');
const each = require('lodash/collection/forEach');
require('lunr-no/lunr.stemmer.support')(lunr);
require('lunr-no')(lunr);

const index = lunr(function () {
  // use the language
  this.use(lunr.no);

  // then, the normal lunr index initialization
  this.field('title', { boost: 10 });
  this.field('categoryId');
  this.field('markdown');
  this.field('tags' ,{ boost : 100 });
  this.field('title');

  this.ref('id');
});

module.exports = function(radar) {

  if(!radar){
    throw new Error('NoRadarFoundException');
  }

  each(radar.categories, function(category){
    each(category.points, function(point){
      const document = {
        id: point.id,
        title: point.title,
        markdown: point.markdown,
        categoryId: point.categoryId,
        tags: point.tags
      };

      index.add(document);
    });
  });

  return JSON.parse(JSON.stringify(index.toJSON()));
};

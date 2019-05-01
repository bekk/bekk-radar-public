//WARNING: this file is used by node, please be careful with unsupported ES2015 features.

const tv4 = require('tv4');

tv4.addSchema({
  title: 'Point',
  id: 'http://radar.bekk.no/schemas/point.json',
  type: 'object',
  properties: {
    title: { type: 'string' },
    score: {
      type: 'number',
      minimum: 0,
      maximum: 1
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['title', 'score']
});


tv4.addSchema({
  title: 'Category',
  id: 'http://radar.bekk.no/schemas/category.json',
  type: 'object',
  properties: {
    title: {
      description: 'Title of the category',
      type: 'string'
    },
    points: {
      description: 'The points for this category',
      type: 'object',
      additionalProperties: {
        $ref: 'point.json'
      }
    }
  },
  required: ['title']
});

const radarSchema = {
  title: 'Radar',
  id: 'http://radar.bekk.no/schemas/radar.json',
  type: 'object',
  properties: {
    title: {
      description: 'Title of the radar',
      type: 'string'
    },
    categories: {
      description: 'The different parts of the radar',
      type: 'object',
      additionalProperties: {
        $ref: 'category.json'
      }
    }
  },
  required: ['title', 'categories']
};

module.exports = function checkRadar(radar) {
  return tv4.validateMultiple(radar, radarSchema);
};

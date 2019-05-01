/*eslint no-console: 0 */
'use strict';
const Imagemin = require('imagemin');
const lwip = require('pajk-lwip');
const Trello = require('node-trello');
const fs = require('fs');
const request = require('request');
const path = require('path');
const _ = require('lodash');

const toUrl = require('../src/lib/toUrl');
const writeRadar = require('./writeRadar');

const argv = require('yargs')
  .usage('Generate a radar from a trello board')
  .option('board', {
    alias: 'b',
    demand: true,
    describe: 'Name of the board to import',
    type: 'string',
  })
  .option('url', {
    demand: true,
    type: 'string',
    describe: 'The url to the board, i.e. `ux2016`',
    type: 'string',
  })
  .option('appkey', {
      alias: 'a',
      demand: true,
      type: 'string',
      describe: `Appkey obtained from:\n https://trello.com/app-key`,
  })
  .option('token', {
    alias: 't',
    demand: true,
    type: 'string',
    describe: `Token obtained from:\n https://trello.com/1/connect?key=${appkey}&name=Radar-importer&response_type=token`,
  })
  .option('json', {
    type: 'bool',
    describe: "Don't output any files, just print json object to stdout",
  })
  .option('levels', {
    type: 'array',
    describe:
      'Array of label names to use for determining the score of points. Scores will be evenly distributed from best to worst.',
    default: ['Anbefaler', 'Prøv/Vurder', 'Unngå'],
  })
  .option('no-images', {
    type: 'bool',
    describe: "Don't download images",
  })
  .option('include-unrated', {
    type: 'bool',
    describe: 'Include points without score.',
  })
  .option('verbose', {
    alias: 'v',
    type: 'bool',
    describe: 'Show debug output',
  })
  .help('help')
  .example(
    '$0 --appkey "<appkey here>" --token "<token here>" --board "Interactive radar" --levels "Anbefaler" "Prøv/Vurder" "Unngå" --url "ux2016"'
  )
  .wrap(140).argv;

function main() {
  const config = {
    boardName: argv.board,
    jsonOutputOnly: argv.json,
    noImages: argv['no-images'],
    levels: argv.levels,
    onlyRated: !argv['include-unrated'],
    boardUrl: argv['url'],
  };

  importRadarByName(config).then(
    radar => {
      const jsonData = JSON.stringify(radar);
      if (config.jsonOutputOnly) {
        console.log(jsonData);
      } else {
        const parsed = JSON.parse(jsonData);
        const path = `./src/content/${parsed.id}`;
        mkdirSync(path);
        mkdirSync(`${path}/points`);
        if (config.noImages) {
          writeRadar(parsed, path);
        } else {
          downloadPointCovers(parsed, path).then(() => {
            writeRadar(parsed, path);
          });
        }
      }
    },
    err => {
      console.error(`Failed to import radar: ${err}`);
    }
  );
}

const importRadarByName = config =>
  new Promise((resolve, reject) => {
    debug(`Importing radar: ${config.boardName}`);
    fetchBoards().then(
      boards => {
        const matching = boards.filter(
          b => b.name.toLowerCase() === config.boardName.toLowerCase()
        );
        if (matching.length === 0) {
          console.error(`No matches for "${name}", available boards:`);
          console.error(boards.map(b => b.name));
          process.exit(1);
        } else if (matching.length > 1) {
          console.error(`Too many boards matching "${name}"`);
          process.exit(1);
        }

        const boardId = matching[0].id;
        debug(`Matching trello board found with id: ${boardId}`);
        importRadarById(boardId, config).then(resolve, reject);
      },
      err => {
        reject(err);
      }
    );
  });

const importRadarById = (boardId, config) =>
  new Promise((resolve, reject) => {
    Promise.all([
      fetchLists(boardId),
      fetchLabels(boardId),
      fetchCards(boardId),
    ]).then(results => {
      const rawData = {
        lists: results[0],
        labels: results[1],
        cards: results[2],
      };

      const levelScores = evenlyDistributeLevels(config.levels);
      const categories = importCategories(rawData, config, levelScores);
      debug(`Imported ${Object.keys(categories).length} categories`);

      const tags = getTagsFromCategories(categories);
      debug(`Imported ${tags.length} tags`);

      importRadarCover(rawData, config.boardUrl);

      const intro = importIntro(rawData);
      debug('Imported intro');

      const radar = {
        title: config.boardName,
        intro,
        id: config.boardUrl,
        tags,
        levels: Object.keys(levelScores).map(key => ({
          title: key,
          radius: levelScores[key].to,
        })),
        categories,
      };

      debug(`Radar '${radar.title}' converted to js object`);
      resolve(radar);
    }, reject);
  });

const importIntro = rawData => {
  const introCard = rawData.cards.find(
    card => card.name.toLowerCase() === 'intro'
  );
  return introCard ? introCard.desc : '';
};

const importRadarCover = (rawData, radarId) => {
  const introCard = rawData.cards.find(
    card => card.name.toLowerCase() === 'intro'
  );
  const coverUrl = introCard.attachments[0] && introCard.attachments[0].url;

  const fileExt = path.extname(coverUrl);
  const filePath = `./src/content/${radarId}/cover${fileExt}`;
  downloadAndSaveFile(coverUrl, filePath);
};

const importCategories = (rawData, config, levelScores) => {
  const tagFromLabelId = indexTagByLabelId(rawData.labels);
  const levelNameFromLabelId = indexLevelNameByLabelId(
    rawData.labels,
    levelScores
  );

  // Old boards
  const listsToConvert = rawData.lists
    .filter(list => /^@/.test(list.name))
    .map(list => list.name);

  debug(`Converting ${listsToConvert.length} lists into categories`);

  const categories = listsToConvert.map(listName => ({
    title: listName.substring(1),
    id: toUrl(listName.substring(1)),
    tagline: importCategoryTaglines(rawData, listName),
    //  intro: 'TODO',
    points: importCategoryPoints(
      rawData,
      config,
      levelScores,
      listName,
      tagFromLabelId,
      levelNameFromLabelId
    ),
  }));

  return _.indexBy(categories, 'id');
};

const importCategoryTaglines = (rawData, listName) => {
  const list = rawData.lists.find(list => list.name === listName);
  const cardsForCategory = rawData.cards.filter(
    card => card.idList === list.id
  );

  let tagline = cardsForCategory
    .map(card => {
      return { name: card.name, tagline: card.desc };
    })
    .filter(card => card.name === '$tagline');

  debug(`Importing taglines from: ${listName}`);
  return tagline[0] ? tagline[0].tagline : '';
};

const importCategoryPoints = (
  rawData,
  options,
  levelScores,
  listName,
  tagFromLabelId,
  levelNameFromLabelId
) => {
  debug(`Converting list: ${listName}`);

  const list = rawData.lists.find(list => list.name === listName);
  if (!list) {
    console.error(`No list found: ${listName}`);
    process.exit(1);
  }
  const cardsForCategory = rawData.cards.filter(
    card => card.idList === list.id
  );
  const onlyRated = options.onlyRated;

  //rough conversion
  let points = cardsForCategory
    .map(card => {
      return {
        title: card.name,
        id: toUrl(card.name),
        markdown: card.desc,
        tags: card.idLabels
          .map(tagFromLabelId)
          .filter(labelName => labelName != null),
        levelName: card.idLabels
          .map(levelNameFromLabelId)
          .find(name => name != null),
        coverUrl: card.attachments[0] && card.attachments[0].url,
      };
    })
    .filter(
      point =>
        point.title !== '$tagline' &&
        (!onlyRated || point.levelName != undefined)
    );

  //scoring
  const numPointsWithLevel = _.countBy(points, point => point.levelName);
  Object.keys(levelScores).map(level => {
    const levelFrom = levelScores[level].from;
    const levelTo = levelScores[level].to;
    points.filter(point => point.levelName === level).map((point, index) => {
      delete point.levelName;
      point.score =
        levelFrom +
        (levelTo - levelFrom) * (index + 0.5) / numPointsWithLevel[level];
    });
  });

  return _.indexBy(points, 'id');
};

//Trello api-wrapper
const t = new Trello(argv.appkey, argv.token);

const fetchLists = boardId =>
  new Promise((resolve, reject) => {
    debug(`Fetching lists for board with id: ${boardId}`);
    t.get(`/1/boards/${boardId}/lists?fields=id,name`, (err, lists) => {
      if (err) {
        reject(err);
      }
      resolve(lists);
    });
  });

const fetchLabels = boardId =>
  new Promise((resolve, reject) => {
    debug(`Fetching labels for board with id: ${boardId}`);
    t.get(`/1/boards/${boardId}/labels?fields=id,name`, (err, labels) => {
      if (err) {
        reject(err);
      }
      resolve(labels);
    });
  });

const fetchCards = boardId =>
  new Promise((resolve, reject) => {
    debug(`Fetching cards for board with id: ${boardId}`);
    t.get(
      `/1/boards/${boardId}/cards?attachments=cover&fields=name,idList,idLabels,desc,labels,pos`,
      (err, cards) => {
        if (err) {
          reject(err);
        }
        resolve(cards);
      }
    );
  });

const fetchBoards = () =>
  new Promise((resolve, reject) => {
    t.get('/1/members/me/boards?fields=id,name', function(err, boards) {
      if (err) {
        reject(err);
      }
      resolve(boards);
    });
  });

function evenlyDistributeLevels(levels) {
  let scores = {};
  const numLevels = levels.length;
  levels.map(
    (l, index) =>
      (scores[l] = {
        from: index / numLevels,
        to: (index + 1) / numLevels,
      })
  );
  return scores;
}

function indexLevelNameByLabelId(labels, levelScores) {
  let index = {};
  labels
    .filter(label => levelScores[label.name])
    .forEach(label => (index[label.id] = label.name));
  return id => index[id];
}

function indexTagByLabelId(labels) {
  const pattern = /^#(.+)$/;
  let index = {};
  labels
    .filter(d => pattern.test(d.name))
    .forEach(d => (index[d.id] = pattern.exec(d.name)[1]));
  return id => index[id];
}

const getTagsFromCategories = categories =>
  _.chain(categories)
    .map(c =>
      _.chain(c.points)
        .map(p => _.values(p.tags))
        .value()
    )
    .flattenDeep()
    .uniq()
    .value();

function debug() {
  if (argv.verbose) {
    console.log.apply(console, arguments);
  }
}

function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

const downloadPointCovers = (radar, directoryPath) => {
  const pointsWithCovers = _.chain(radar.categories)
    .map(category => _.filter(category.points, point => point.coverUrl != null))
    .flatten()
    .value();

  return Promise.all(
    pointsWithCovers.map(point => {
      const fileExt = path.extname(point.coverUrl);
      const filePath = `${directoryPath}/points/${point.id}${fileExt}`;
      return downloadAndSaveFile(point.coverUrl, filePath);
    })
  );
};

const compressImages = function(filename, max) {
  switch (path.extname(filename)) {
    case '.jpg':
    case '.JPG': {
      new Imagemin()
        .src(filename)
        .dest(path.dirname(filename))
        .use(Imagemin.jpegtran({ progressive: true }))
        .run(function(err, files) {
          debug(`Minified ${files[0].path}`);
          if (err) throw err;
        });
    }
  }
};

const downloadAndSaveFile = (uri, filename) => {
  const p = new Promise((resolve, reject) => {
    request.head(uri, function(err) {
      if (err) {
        reject(err);
      }
      debug(`Downloading ${uri}`);
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', function() {
          resolve(filename);
        });
    });
  });

  p.then(function(filename) {
    const oldFilename = filename;
    const extension = path.extname(oldFilename);
    const smallFilename = oldFilename.replace(extension, `-small${extension}`);
    const largeFilename = oldFilename;
    const retinaFilename = oldFilename.replace(
      extension,
      `-retina${extension}`
    );

    lwip.open(filename, function(err, image) {
      image.clone(function(err, retina) {
        retina
          .batch()
          .cover(2560, 1704)
          .writeFile(retinaFilename, function(err) {
            if (err) throw err;
            debug(`Resized image ${retinaFilename}`);

            compressImages(retinaFilename);
          });
      });

      image.clone(function(err, large) {
        large
          .batch()
          .cover(1280, 852)
          .writeFile(largeFilename, function(err) {
            if (err) throw err;
            debug(`Resized image ${largeFilename}`);

            compressImages(largeFilename);
          });
      });

      image.clone(function(err, small) {
        small
          .batch()
          .cover(768, 511)
          .writeFile(smallFilename, function(err) {
            if (err) throw err;
            debug(`Resized image ${smallFilename}`);

            compressImages(smallFilename);
          });
      });
    });
  });
};

main();

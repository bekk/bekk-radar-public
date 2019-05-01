export default function getLevelForScore(levels, score) {
  const withoutTooLow = levels.filter(level => level.radius > score);
  const lowestOfRemaining = withoutTooLow.reduce((lowest, level) => {
    if(!lowest){
      return level;
    } else {
      return level.radius < lowest.radius ? level : lowest;
    }
  });
  return lowestOfRemaining.title;
}

export default function groupPointsByLevel(points, levels) {
  const sortedLevels = levels.slice().sort((a, b) => a.radius - b.radius);
  const sortedPoints = Object.keys(points)
    .map(key => points[key])
    .sort((a, b) => a.score - b.score);
  let lower = 0;
  let groupedPoints = {};
  sortedLevels.map(l => {
    const group = sortedPoints
      .filter(p => p.score >= lower && p.score < l.radius)
      .sort((a, b) => a.score - b.score);
    lower = l.radius;
    groupedPoints[l.title] = group;
  });
  return groupedPoints;
}

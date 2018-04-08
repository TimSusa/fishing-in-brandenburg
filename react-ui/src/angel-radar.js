import {davAngeln} from './data/dav-angel'

export function getNamesAndAreas (limit, isAsc = true) {
  const namesAndAreas = extractNamesAndAreas(davAngeln.positions)
  const areasWithNamesGreater = extractAreasWithGreaterThan(namesAndAreas, limit)
  return sortAfterAreas(areasWithNamesGreater, isAsc)
};

function extractNamesAndAreas (positions) {
  return positions
    .map(extractNameAndArea)
}

// This function will get a position from array and
// return the name, coods and the area
function extractNameAndArea (position) {
  const area = parseFloat(position[4])
  const name = position[3]
  const coods = position[6]
  const community = position[11]
  return {
    name,
    area,
    community,
    coods
  }
}

// This function will be given an array and
// a thresh value to filter out smaller areas
function extractAreasWithGreaterThan (namesAndAreas, threshold) {
  return namesAndAreas.filter((item) => {
    return item.area > threshold
  })
}

function sortAfterAreas (areas, isAsc) {
  var sorted = areas.sort(function (a, b) { return a.area - b.area })
  sorted = isAsc ? sorted.reverse() : sorted
  return sorted
}

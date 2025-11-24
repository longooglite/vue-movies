export const releaseDateToYear = (releaseDate: string): number => {
  const splits = releaseDate.split('-')
  if (splits.length === 1) {
    return Number(releaseDate)
  } else if (splits.length === 3) {
    return Number(splits[0])
  } else {
    console.error(`Invalid release date: ${releaseDate}`)
    return NaN
  }
}

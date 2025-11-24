export const releaseDateToYear = (releaseDate: string): number => {
  return Number(releaseDate.split('-')[0])
}

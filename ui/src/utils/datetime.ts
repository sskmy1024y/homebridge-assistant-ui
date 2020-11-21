/**
 * Returns whether the passed time belongs between two hours.
 *
 * e.g. `betweenTime(new Date('10:00'), 10, 16) : true`
 *      `betweenTime(new Date('14:00'), 9, 13) : false`
 *
 * @param target date
 * @param from hour
 * @param to hour
 */
export const isBetweenHour = (target: Date, from: number, to: number) => {
  return from <= target.getHours() && target.getHours() <= to
}

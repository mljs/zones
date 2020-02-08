import { normalize } from './normalize';

/**
 * Convert an array of exclusions and keep only from / to
 * @param {object} [exclusions=[]]
 * @param {object} [options={}]
 * @param {number} [options.from=Number.MIN_VALUE]
 * @param {number} [options.to=Number.MAX_VALUE]
 */

export function invert(exclusions = [], options = {}) {
  let {
    from = Number.NEGATIVE_INFINITY,
    to = Number.POSITIVE_INFINITY,
  } = options;
  exclusions = normalize(exclusions, { from, to });
  if (exclusions.length === 0) return [{ from, to }];

  let zones = [];
  for (let i = 0; i < exclusions.length; i++) {
    let exclusion = exclusions[i];
    let nextExclusion = exclusions[i + 1];
    if (i === 0) {
      if (exclusion.from > from) {
        zones.push({ from, to: exclusion.from });
      }
    }
    if (i === exclusions.length - 1) {
      if (exclusion.to < to) {
        zones.push({ from: exclusion.to, to });
      }
    } else {
      zones.push({ from: exclusion.to, to: nextExclusion.from });
    }
  }

  return zones;
}
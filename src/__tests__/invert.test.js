import { invert } from '../invert.js';

describe('invert', function() {
  it('no exclusions, no from to', () => {
    let exclusions = [];

    let result = invert(exclusions);
    expect(result).toStrictEqual([
      { from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY },
    ]);
  });

  it('no exclusions, from to', () => {
    let exclusions = [];

    let result = invert(exclusions, { from: 2, to: 4 });
    expect(result).toStrictEqual([{ from: 2, to: 4 }]);
  });

  it('exclusions -1 to 5', () => {
    let exclusions = [{ from: -1, to: 5 }];
    let result = invert(exclusions);
    expect(result).toStrictEqual([
      { from: -Infinity, to: -1 },
      { from: 5, to: Infinity },
    ]);
  });

  it('exclusions 5 to 15', () => {
    let exclusions = [{ from: 5, to: 15 }];
    let result = invert(exclusions);
    expect(result).toStrictEqual([
      { from: -Infinity, to: 5 },
      { from: 15, to: Infinity },
    ]);
  });

  it('exclusions -1 to 5, from:0, to:10', () => {
    let exclusions = [{ from: -1, to: 5 }];
    let result = invert(exclusions, { from: 0, to: 10 });
    expect(result).toStrictEqual([{ from: 5, to: 10 }]);
  });

  it('exclusions 5 to 15, from:0, to:10', () => {
    let exclusions = [{ from: 5, to: 15 }];
    let result = invert(exclusions, { from: 0, to: 10 });
    expect(result).toStrictEqual([{ from: 0, to: 5 }]);
  });

  it('exclusions 5 to 15, from:10, to:0', () => {
    let exclusions = [{ from: 10, to: 5 }];
    let result = invert(exclusions, { from: 10, to: 0 });
    expect(result).toStrictEqual([{ from: 0, to: 5 }]);
  });

  it('exclusions 1 to 2 and 5 to 15, from:0, to:10', () => {
    let exclusions = [
      { from: 1, to: 2 },
      { from: 5, to: 15 },
    ];
    let result = invert(exclusions, { from: 0, to: 10 });
    expect(result).toStrictEqual([
      { from: 0, to: 1 },
      { from: 2, to: 5 },
    ]);
  });

  it('exclusions 1 to 2 and 5 to 7, from:0, to:10', () => {
    let exclusions = [
      { from: 1, to: 2 },
      { from: 5, to: 7 },
    ];
    let result = invert(exclusions, { from: 0, to: 10 });
    expect(result).toStrictEqual([
      { from: 0, to: 1 },
      { from: 2, to: 5 },
      { from: 7, to: 10 },
    ]);
  });
});

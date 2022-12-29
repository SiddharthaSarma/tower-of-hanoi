import { getInitialDisc, updateDiscPosition } from './index';

describe('core', () => {
  it('getInitialDisc', () => {
    const discs = getInitialDisc(3);
    expect(discs.length).toBe(3);
    expect(discs[0].id).toBe(1);
    expect(discs[1].id).toBe(2);
    expect(discs[2].id).toBe(3);
  });
  it('should not change position when we try to move disc 2', () => {
    const discs = [[...getInitialDisc(3)], [], []];
    const result = updateDiscPosition(discs, 1, 3, 2);
    expect(result).toEqual(discs);
  });
  it('should change position when we try to move discs', () => {
    const discs = [[...getInitialDisc(3)], [], []];
    let result = updateDiscPosition(discs, 1, 3, 1);
    expect(result).toEqual([
      [
        { id: 2, value: 2 },
        { id: 3, value: 3 },
      ],
      [],
      [{ id: 1, value: 1 }],
    ]);
    result = updateDiscPosition(result, 1, 2, 2);
    result = updateDiscPosition(result, 3, 2, 1);
    expect(result).toEqual([
      [{ id: 3, value: 3 }],
      [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
      ],
      [],
    ]);
  });
});

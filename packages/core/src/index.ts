export interface Disc {
  id: number;
  value: number;
}

export const getInitialDisc = (count: number) => {
  const result: Disc[] = [];
  for (let i = 0; i < count; i++) {
    result.push({ id: i + 1, value: i + 1 });
  }
  return result;
};

export const updateDiscPosition = (discs: Disc[][], from: number, to: number, discNo: number) => {
  const localDiscs = [...discs];
  const disc = localDiscs[from - 1].find(
    (disc) => disc.value === discNo
  );
  if (
    disc &&
    (!localDiscs[to - 1].length ||
      disc.value < localDiscs[to - 1][0].value)
  ) {
    localDiscs[from - 1] = localDiscs[from - 1].filter(
      (disc) => disc.value !== Number(discNo)
    );
    localDiscs[to - 1].unshift(disc);
  }

  return localDiscs;
}

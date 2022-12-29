// src/index.ts
var getInitialDisc = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({ id: i + 1, value: i + 1 });
  }
  return result;
};
var updateDiscPosition = (discs, from, to, discNo) => {
  const localDiscs = [...discs];
  const disc = localDiscs[from - 1].find(
    (disc2) => disc2.value === discNo
  );
  if (disc && (!localDiscs[to - 1].length || disc.value < localDiscs[to - 1][0].value)) {
    localDiscs[from - 1] = localDiscs[from - 1].filter(
      (disc2) => disc2.value !== Number(discNo)
    );
    localDiscs[to - 1].unshift(disc);
  }
  return localDiscs;
};
export {
  getInitialDisc,
  updateDiscPosition
};
//# sourceMappingURL=index.mjs.map
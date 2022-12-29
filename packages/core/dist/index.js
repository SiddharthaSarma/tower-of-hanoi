var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getInitialDisc: () => getInitialDisc,
  updateDiscPosition: () => updateDiscPosition
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInitialDisc,
  updateDiscPosition
});
//# sourceMappingURL=index.js.map
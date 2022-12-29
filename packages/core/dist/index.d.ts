interface Disc {
    id: number;
    value: number;
}
declare const getInitialDisc: (count: number) => Disc[];
declare const updateDiscPosition: (discs: Disc[][], from: number, to: number, discNo: number) => Disc[][];

export { Disc, getInitialDisc, updateDiscPosition };

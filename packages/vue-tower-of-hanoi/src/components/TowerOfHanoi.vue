<template>
  <div class="horizontal-base">
    <div
      class="base"
      v-for="rod in rods"
      :key="rod"
      @drop="onDrop($event, rod)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="discs">
        <div
          class="disc"
          v-for="(i, index) in getDiscs(rod - 1)"
          :draggable="index == 0 ? true : false"
          :style="{
            width: 45 * i.value + 'px',
            backgroundColor: discColors[i.value],
          }"
          @dragstart="onDragStart($event, i.id, rod)"
        >
          {{ i.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { discColors } from './utils';
import { ref } from 'vue';
interface Disc {
  id: number;
  value: number;
}
const rods = ref<number>(3);
const initialDisc = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  // { id: 4, value: 4, }
];
const discs = ref<Array<Disc[]>>([[...initialDisc], [], []]);

const getDiscs = (listIndex: number): Disc[] => {
  return discs.value[listIndex];
};
const onDragStart = (event: DragEvent, index: number, fromRod: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemId', index.toString());
    event.dataTransfer.setData('rodId', fromRod.toString());
  }
};
const onDrop = (event: DragEvent, index: number) => {
  const itemId = event.dataTransfer?.getData('itemId');
  const fromRod = Number(event.dataTransfer?.getData('rodId'));
  const disc = discs.value[fromRod - 1].find(
    (disc) => disc.value === Number(itemId)
  );
  if (
    disc &&
    (!discs.value[index - 1].length ||
      disc.value < discs.value[index - 1][0].value)
  ) {
    discs.value[fromRod - 1] = discs.value[fromRod - 1].filter(
      (disc) => disc.value !== Number(itemId)
    );
    discs.value[index - 1].unshift(disc);
  }
  setTimeout(checkWin, 500);
};

const resetGame = () => {
  discs.value = [[...initialDisc], [], []];
}

const checkWin = () => {
  const isWin = discs.value
    .slice(1)
    .some((list) => list.map((disc) => disc.value).join('') === '123');
  if (isWin) {
    window.alert('Congratulations!!, You won :)');
    resetGame();
  }
};
</script>
<style scoped>
.horizontal-base {
  border-bottom: 2px solid #ccc;
  display: flex;
  justify-content: space-around;
  width: 500px;
}
.base {
  height: 200px;
  border: 2px solid #ccc;
  padding: 0.75rem;
  border-bottom: none;
  position: relative;
  background: linear-gradient(to right, #d7b889, #b27315, #966f33);
}
.discs {
  position: absolute;
  bottom: 0;
  left: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.disc {
  border: 2px solid #ccc;
  border-radius: 1.5rem;
  border-bottom: none;
  cursor: pointer;
}
</style>

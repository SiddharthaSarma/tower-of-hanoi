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
import { getInitialDisc, updateDiscPosition } from 'core';
import type { Disc } from 'core';

// constants
const NUMBER_OF_DISCS = 3;
const INITIAL_DISC_POSITION = getInitialDisc(NUMBER_OF_DISCS);

// refs
const rods = ref<number>(3);
const discs = ref<Array<Disc[]>>([[...INITIAL_DISC_POSITION], [], []]);

// methods
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
  const itemId = Number(event.dataTransfer?.getData('itemId'));
  const fromRod = Number(event.dataTransfer?.getData('rodId'));
  discs.value = updateDiscPosition(discs.value, fromRod, index, itemId);
  setTimeout(checkWin, 500);
};

const resetGame = () => {
  discs.value = [[...INITIAL_DISC_POSITION], [], []];
};

const checkWin = () => {
  const isWin = discs.value
    .slice(1)
    .some(
      (list) =>
        list.map((disc) => disc.value).join('') ===
        INITIAL_DISC_POSITION.map((disc) => disc.value).join('')
    );
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

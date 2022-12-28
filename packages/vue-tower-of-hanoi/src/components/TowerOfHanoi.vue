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
          draggable="true"
          v-for="i in getDiscs(rod)"
          :style="{
            width: 45 * i.value + 'px',
            backgroundColor: discColors[i.value],
          }"
          @dragstart="onDragStart($event, i.id)"
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
  list: number;
}
const rods = ref<number>(3);
const discs = ref<Disc[]>([
  { id: 1, value: 1, list: 1 },
  { id: 2, value: 2, list: 1 },
  { id: 3, value: 3, list: 1 },
  { id: 4, value: 4, list: 1 },
]);

const getDiscs = (listIndex: number) => {
  return discs.value.filter((disc) => disc.list === listIndex);
};
const onDragStart = (event: DragEvent, index: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemId', index.toString());
  }
};
const onDrop = (event: DragEvent, index: number) => {
  const itemId = event.dataTransfer?.getData('itemId');
  const disc = discs.value.find((disc) => disc.value.toString() === itemId);
  if (disc) {
    disc.list = index;
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

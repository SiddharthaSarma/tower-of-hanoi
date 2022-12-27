<template>
  <div class="horizontal-base">
    <div class="base">
      <div class="discs" @drop="onDrop($event, 1)">
        <div
          class="disc"
          draggable="true"
          v-for="i in getDiscs(1)"
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
    <div
      class="base"
      @drop="onDrop($event, 2)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="discs">
        <div
          class="disc"
          draggable="true"
          v-for="i in getDiscs(2)"
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
    <div class="base" @drop="onDrop($event, 3)">
      <div class="discs">
        <div
          class="disc"
          draggable="true"
          v-for="i in getDiscs(3)"
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
import { discColors } from "./utils";
import { ref } from "vue";
interface Disc {
  id: number;
  value: number;
  list: number;
}
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
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("itemId", index.toString());
  }
};
const onDrop = (event: DragEvent, index: number) => {
  const itemId = event.dataTransfer?.getData("itemId");
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
  padding: 0.5rem;
  border-bottom: none;
  position: relative;
  background: linear-gradient(to right, #d7b889, #b27315, #966f33);
}
.discs {
  position: absolute;
  bottom: 0;
  left: -85px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.disc {
  border: 2px solid #ccc;
  border-radius: 1.5rem;
  border-bottom: none;
  cursor: pointer;
}
</style>

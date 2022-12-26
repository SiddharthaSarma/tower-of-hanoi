<template>
  <div class="horizontal-base">
    <div class="base">
      <div class="discs">
        <div
          class="disc"
          v-for="i in 4"
          :style="{
            width: 40 * i + 'px',
            backgroundColor: '#' + randomColor(),
          }"
        >
          {{ i }}
        </div>
      </div>
    </div>
    <div class="base">2</div>
    <div class="base">3</div>
  </div>
</template>
<script setup>
import { randomColor } from "./utils";
</script>
<style scoped>
.horizontal-base {
  border-bottom: 2px solid #ccc;
  display: flex;
  justify-content: space-around;
  width: 500px;
  position: relative;
}
.base {
  height: 200px;
  border: 2px solid #ccc;
  padding: 0.5rem;
  border-bottom: none;
}
.discs {
  position: absolute;
  bottom: 0;
  left: 0;
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

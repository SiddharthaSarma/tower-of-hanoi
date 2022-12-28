<script setup lang="ts">
import TowerOfHanoi from './components/TowerOfHanoi.vue';
import {coreName} from 'core';
console.log(coreName);
</script>

<template>
  <div>
    <h1>Tower of Hanoi</h1>
    <TowerOfHanoi />
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <div class="title-grid q-my-sm">
    <div class="title-prefix">
      <slot name="prefix">&nbsp;</slot>
    </div>

    <div class="text-h2 title-text">
      <slot name="text" />
    </div>

    <div class="title-suffix">
      <slot name="suffix">&nbsp;</slot>
    </div>
  </div>
</template>

<style scoped>
.title-grid {
  display: flex;
  align-items: center;
  width: 100%;
}

.title-prefix {
  width: 16.666%;
  text-align: left;
}

.title-text {
  width: 66.667%;
  overflow: hidden;
  text-align: center;
}

.title-suffix {
  width: 16.666%;
  text-align: right;
}
</style>

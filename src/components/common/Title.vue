<script setup lang="ts"></script>

<template>
  <div class="title-grid q-my-sm">
    <div class="title-prefix">
      <slot name="prefix">&nbsp;</slot>
    </div>

    <div class="text-h3 title-text">
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
  width: 15%;
  text-align: left;
}

.title-text {
  width: 70%;
  overflow: hidden;
  text-align: center;
}

.title-suffix {
  width: 15%;
  text-align: right;
}
</style>

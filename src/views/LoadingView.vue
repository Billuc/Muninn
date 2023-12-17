<script setup lang="ts"></script>

<template>
  <div class="loading">
    <QImg src="/icon.svg" alt="Muninn logo" width="100px" />
    <QSpinnerBall size="xl" color="accent" />
  </div>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 8px
}
</style>

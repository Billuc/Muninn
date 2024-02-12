<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface ListCompletionCardProps {
  completion: number;
}

const props = defineProps<ListCompletionCardProps>();

const displayedCompletion = ref(0);
const timeoutId = ref<number | null>(null);

const animate = (target: number) => {
  if (timeoutId.value) window.clearTimeout(timeoutId.value);
  if (target == displayedCompletion.value) return;

  displayedCompletion.value += Math.min(
    0.1 * (target - displayedCompletion.value),
    0.05
  );

  timeoutId.value = window.setTimeout(() => animate(target), 100);
};

watchEffect(() => animate(props.completion));
</script>

<template>
  <div class="completion-card q-pa-sm row rounded-borders bg-primary">
    <div
      :style="`width: calc(${100 * displayedCompletion}% - 1.5rem);`"
      class="completion-feathers"
    ></div>
    <div class="completion-crow">
      <img
        src="/src/assets/crow_flapping.png"
        alt="Crow"
        :class="{ visible: Math.floor(displayedCompletion * 10) % 2 == 0 }"
      />
      <img
        src="/src/assets/crow_flapped.png"
        alt="Crow"
        :class="{ visible: Math.floor(displayedCompletion * 10) % 2 == 1 }"
      />
    </div>
    <QSpace />
    <img src="/src/assets/nest.png" alt="Bird nest" class="completion-nest" />
  </div>
</template>

<style>
.completion-card {
  position: relative;
  height: 2.5rem;
}

.completion-card .completion-feathers {
  background-image: url("/src/assets/feathers.png");
  background-repeat: repeat-x;
  background-position: 0% 0%;
  background-size: auto 100%;

  transition: width 500ms ease-out;
}

.completion-card .completion-crow {
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  z-index: 2;
}

.completion-card .completion-crow img {
  position: absolute;
  top: 0;
  left: 0;

  height: inherit;
  width: inherit;
  transform: scale(1.25);
  opacity: 0;

  transition: opacity 250ms ease-out;
}

.completion-card .completion-crow img.visible {
  opacity: 1;
}

.completion-card .completion-nest {
  position: absolute;
  height: 1rem;
  width: auto;
  top: 50%;
  right: 0.5rem;
}
</style>

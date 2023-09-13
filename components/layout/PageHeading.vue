<template>
  <div
    :class="
      mergeClasses(
        'w-full',
        'flex',
        'flex-wrap',
        'justify-center',
        'items-center',
        'mb-6'
      )
    "
  >
    <h1 :class="mergeClasses('text-4xl', 'font-black')">
      <slot></slot>
    </h1>

    <slot name="append"></slot>
  </div>
</template>

<script setup lang="ts"></script>

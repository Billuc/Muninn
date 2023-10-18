<template>
  <div
    :class="
      mergeClasses(
        'page-heading',
        'w-full',
        'text-center',
        'mb-6',
        'md:mb-8'
      )
    "
  >
    <slot name="prepend"></slot>

    <h1 :class="mergeClasses('text-4xl', 'font-black')">
      <slot></slot>
    </h1>

    <slot name="append"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.page-heading > * {
  display: inline;
}
</style>

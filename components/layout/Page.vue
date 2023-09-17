<template>
  <div
    :class="
      mergeClasses(
        'pb-20',
        'md:pb-4',
        'pt-4',
        'md:pt-20',
        'mx-auto',
        'w-full',
        'min-h-screen',
        'md:w-2/3',
        'px-4'
      )
    "
  >
    <slot name="navbar"></slot>
    
    <div class="max-w-xl mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

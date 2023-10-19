<template>
  <div
    :class="
      mergeClasses(
        'bg-base-300',
        'flex',
        leftHanded ? 'flex-row' : 'flex-row-reverse',
        'md:flex-row',
        'justify-start',
        'items-center',
        'fixed',
        'top-auto',
        'md:top-0',
        'bottom-0',
        'md:bottom-auto',
        leftHanded ? 'right-auto' : 'right-4',
        'md:right-auto',
        leftHanded ? 'left-4' : 'left-auto',
        'md:left-4',
        'rounded-lg',
        'z-10',
        'my-2',
        undefined,
        'before:absolute',
        'before:top-0',
        'before:bottom-0',
        'before:left-0',
        'before:right-0',
        'before:bg-inherit',
        leftHanded ? 'before:skew-x-[-30deg]' : 'before:skew-x-[30deg]',
        'md:before:skew-x-[-30deg]',
        'before:origin-bottom-left',
        'before:rounded-lg',
        'before:z-[-1]'
      )
    "
  >
    <NavBurger @click="open" />
    <NuxtLink href="/" class="btn btn-square btn-ghost md:btn-lg !p-2" exact>
      <img src="/icon.svg" class="w-full" />
    </NuxtLink>
    <span class="text-3xl font-extrabold px-4">Muninn</span>
    <StatusIcon/>
  </div>
</template>

<script setup>
import NavBurger from "./NavBurger.vue";
import { useGeneralStore } from "~/stores/generalStore";
import { storeToRefs } from "pinia";
import StatusIcon from "./StatusIcon.vue";

const emit = defineEmits(["open"]);
const store = useGeneralStore();

const { leftHanded } = storeToRefs(store);

const open = () => emit("open");
</script>

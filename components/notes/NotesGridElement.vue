<template>
  <NuxtLink
    :class="
      mergeClasses(
        'card',
        'card-side',
        'py-2',
        'px-4',
        'items-center',
        'gap-2',
        'bg-base-200',
        'hover:bg-base-300',
        'transition-colors',
        'duration-300',
        'shadow-md'
      )
    "
    @click="onClick"
    :href="props.href"
  >
    <FontAwesomeIcon :icon="faLightbulb" size="2xl" class="text-accent" />

    <div :class="mergeClasses('card-body', 'p-0', 'gap-0')">
      <div class="card-title leading-5">
        {{ props.label }}
      </div>
    </div>

    <TagVue v-if="props.tag" :icon="props.tag.icon" :color="props.tag.color" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { Tag } from "~/models/Tag";
import TagVue from "../TagVue.vue";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface NotesGridElementProps {
  label: string;
  href?: string;
  tag?: Tag;
}

const props = defineProps<NotesGridElementProps>();
const emit = defineEmits(["click"]);

function onClick(ev: Event) {
  if (!props.href) {
    ev.preventDefault();
    emit("click");
  }
}
</script>

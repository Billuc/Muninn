<template>
  <div class="flex flex-col items-center gap-2">
    <EventTagFilter
      :selected="tagFilter"
      @update:selected="(v) => (tagFilter = v)"
    />

    <Button @click="date = new Date()" class="btn-primary btn-outline">
      Today
    </Button>

    <Calendar :tag-filter="tagFilter" v-model:date="date" class="w-full mt-2" />
  </div>
</template>

<script setup lang="ts">
import Calendar from "~/components/events/Calendar.vue";
import EventTagFilter from "~/components/events/EventTagFilter.vue";

const tagFilter = ref(-1);
const date = ref(new Date());
</script>

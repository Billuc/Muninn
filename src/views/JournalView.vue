<script setup lang="ts">
import { ref } from "vue";
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import DateSelect from "@/components/common/DateSelect.vue";
import MoodSelect from "@/components/journal/MoodSelect.vue";

const mood = ref(0);
const date = ref(new Date());
</script>

<template>
  <div>
    <Title>
      <template #text>Journal</template>
    </Title>

    <PageActions>
      <DateSelect v-model="date" />
    </PageActions>

    <MoodSelect v-model="mood" />
  </div>
</template>

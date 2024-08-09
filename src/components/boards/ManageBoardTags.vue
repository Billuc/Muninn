<script setup lang="ts">
import { useRouter } from "vue-router";
import PageAction from "@/components/common/PageAction.vue";

const router = useRouter();

const toTags = () => router.push({ name: "board-tags" });
</script>

<template>
  <PageAction
    color="secondary"
    icon="mdi-tag"
    label="Manage tags"
    @click="toTags"
  />
</template>

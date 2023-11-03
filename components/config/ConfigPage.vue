<template>
  <div class="relative">
    <h2 class="text-2xl font-bold my-4">General</h2>

    <Form>
      <ToggleField
        :value="store.leftHanded"
        @update:value="onUpdateLeftHanded"
        label="Left Handed"
        :icon="faHand"
      />
      <ConfigThemeSelector />
    </Form>

    <h2 class="text-2xl font-bold my-4">Events</h2>

    <ConfigEventsConfig />

    <h2 class="text-2xl font-bold my-4">Notes</h2>

    <ConfigNotesConfig />
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/data/stores/generalStore";
import { faHand } from "@fortawesome/free-solid-svg-icons";

const store = useGeneralStore();

const onUpdateLeftHanded = (v: boolean) => store.setLeftHanded(v);
</script>

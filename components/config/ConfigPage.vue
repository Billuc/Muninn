<template>
  <div class="relative">
    <h2 class="text-2xl font-bold my-4">General</h2>

    <ToggleField
      :value="store.leftHanded"
      @update:value="onUpdateLeftHanded"
      label="Left Handed"
      :icon="faHand"
    />

    <h2 class="text-2xl font-bold my-4">Theme</h2>

    <ThemeSelector />

    <h2 class="text-2xl font-bold my-4">Events</h2>

    <EventsConfig />

    <h2 class="text-2xl font-bold my-4">Notes</h2>

    <NotesConfig />
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "~/stores/generalStore";
import ToggleField from "../ToggleField.vue";
import ThemeSelector from "./ThemeSelector.vue";
import EventsConfig from "./EventsConfig.vue";
import NotesConfig from "./NotesConfig.vue";
import { faHand } from "@fortawesome/free-solid-svg-icons";

const store = useGeneralStore();

const onUpdateLeftHanded = (v: boolean) => store.setLeftHanded(v);
</script>

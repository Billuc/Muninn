<script setup lang="ts">
import Card from "@/components/common/Card.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ThemeService } from "@/data/services/themeService";
import { computed, ref } from "vue";
import List from "../common/List.vue";
import ColorPicker from "./ColorPicker.vue";
import { Theme } from "@/data/models/Theme";

const themeService = useService(ThemeService);
const themeData = await themeService.get();
const theme = ref(themeData);
useSubscription(themeService, theme);

const themeAsArray = computed(() =>
  Object.entries(theme.value)
    .map(([k, v]) => ({ id: k, value: v }))
    .filter((v) => v.id != "id")
);

const updateColor = async (
  colorName: keyof Omit<Theme, "id">,
  colorValue: string
) => {
  const newTheme = { ...theme.value };
  newTheme[colorName] = colorValue;

  await themeService.update(newTheme);
};
</script>

<template>
  <Card title="Theme">
    <List :elements="themeAsArray">
      <template #element="{ element }">
        <div>{{ element.id }}</div>

        <QSpace />

        <ColorPicker
          :model-value="element.value"
          @update:model-value="(v) => updateColor(element.id, v)"
        />
      </template>
    </List>
  </Card>
</template>

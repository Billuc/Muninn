<script setup lang="ts">
import Card from "@/components/common/Card.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ThemeService } from "@/data/services/themeService";
import { computed, ref } from "vue";
import List from "../common/List.vue";
import ColorPicker from "./ColorPicker.vue";
import { DEFAULT_THEME, Theme } from "@/data/models/Theme";
import { contrast } from "@/utils/colors";

const themeService = useService(ThemeService);
const themeData = await themeService.get();
const theme = ref(themeData);
useSubscription(themeService, theme);

const themeAsArray = computed(() =>
  Object.entries(theme.value)
    .filter(([k, _]) => !k.endsWith("Text") && k != "id")
    .map(([k, v]) => ({
      id: k,
      value: v,
      // ex: k is primary, text is ['primaryText', ...]
      text: Object.entries(theme.value).find(
        ([otherK, _]) => otherK == `${k}Text`
      ),
    }))
    .map((el) => {
      const elContrast = el.text ? contrast(el.value, el.text[1]) : null;

      if (elContrast == null)
        return {
          ...el,
          contrastLabel: null,
          contrastColor: null,
          contrastTextColor: null,
        };

      return {
        ...el,
        contrastLabel: elContrast > 7 ? "AAA" : elContrast > 4.5 ? "AA" : "x",
        contrastColor:
          elContrast > 7 ? "green" : elContrast > 4.5 ? "yellow" : "red",
        contrastTextColor:
          elContrast <= 7 && elContrast > 4.5 ? "black" : "white",
      };
    })
);

const updateColor = async (
  colorName: keyof Omit<Theme, "id">,
  colorValue: string
) => {
  const newTheme = { ...theme.value };
  newTheme[colorName] = colorValue;

  await themeService.update(newTheme);
};

const setDefaultTheme = async () => {
  await themeService.update(DEFAULT_THEME);
};
</script>

<template>
  <Card title="Theme">
    <List :elements="themeAsArray" class="montserrat">
      <template #element="{ element }">
        <div class="col-5">{{ element.id }}</div>

        <div class="col-5">
          <ColorPicker
            :model-value="element.value"
            @update:model-value="(v) => updateColor(element.id, v)"
          />
          <ColorPicker
            :model-value="element.text[1]"
            @update:model-value="(v) => updateColor(element.text[0], v)"
            v-if="element.text"
          />
        </div>

        <div class="col-2 text-center">
          <QBadge
            :color="element.contrastColor"
            :label="element.contrastLabel"
            :text-color="element.contrastTextColor"
            v-if="element.text"
          />
        </div>
      </template>
    </List>

    <QBtn
      @click="setDefaultTheme"
      size="sm"
      class="q-mt-sm montserrat"
      color="secondary"
      text-color="text"
    >
      Reset to default
    </QBtn>
  </Card>
</template>

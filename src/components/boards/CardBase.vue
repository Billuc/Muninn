<script setup lang="ts">
import CardActionBase from "./CardActionBase.vue";

interface CardBaseProps {
  noActions?: boolean;
}

const props = defineProps<CardBaseProps>();
const emit = defineEmits(["up", "down"]);

const onUp = () => emit("up");
const onDown = () => emit("down");
</script>

<template>
  <QCard>
    <QCardSection>
      <slot></slot>
    </QCardSection>

    <div class="absolute card-actions" v-if="!props.noActions">
      <slot name="actions"></slot>

      <QBtnGroup rounded>
        <CardActionBase
          icon="mdi-chevron-up"
          tooltip="Move card up"
          @click="onUp"
        />
        <CardActionBase
          icon="mdi-chevron-down"
          tooltip="Move card down"
          @click="onDown"
        />
      </QBtnGroup>
    </div>
  </QCard>
</template>

<style>
.card-actions {
  top: -0.75rem;
  right: -0.75rem;

  display: flex;
  flex-flow: row nowrap;
  gap: 0.25rem;
}
</style>

<script setup lang="ts">
import { useService } from "@/composables/useService";
import { ID } from "@/data/models/ID";
import { ListElementService } from "@/data/services/listElementService";
import { QPopupEdit } from "quasar";
import { ref } from "vue";

interface NewListElementProps {
  listId: ID;
  nextIndex: number;
}

const props = defineProps<NewListElementProps>();
const listElementService = useService(ListElementService);

const popupedit = ref<QPopupEdit | null>(null);

const onNewChild = async (v: string | null) => {
  const value = v?.trim();

  if (!!value) {
    await listElementService.create({
      listId: props.listId,
      title: value,
      index: props.nextIndex,
    });
    popupedit.value?.show();
  }
};
</script>

<template>
  <div class="new-element">
    <div>New element</div>

    <QPopupEdit
      :model-value="''"
      v-slot="scope"
      @save="onNewChild"
      ref="popupedit"
    >
      <QInput
        v-model="scope.value"
        dense
        autofocus
        @keyup.enter="scope.set"
        clearable
      />
    </QPopupEdit>
  </div>
</template>

<style>
.new-element {
  padding: 4px 0 0 16px;
  color: #8e8e8e;
}
</style>

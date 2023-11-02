<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-center', 'gap-x-2')
    "
  >
    <div class="flex flex-nowrap items-center gap-x-4">
      <FontAwesomeIcon :icon="faBars" class="text-base-300" size="lg" />
      <Checkbox :value="false" disabled class="checkbox-primary" />
    </div>

    <MultilineInput
      v-model:value="elementText"
      placeholder="Write here..."
      class="w-full"
      detect-enter
      @enter="execute"
    />
    <Button
      :icon="faPlus"
      class="btn-circle !btn-xs"
      :loading="loading"
      @click="execute"
    />
  </div>
</template>

<script setup lang="ts">
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { type ID } from "~/data/models/ID";
import { ListElementService } from "~/data/services/listElementService";

interface AddElementProps {
  listId: ID;
  parentId?: ID;
}

const props = defineProps<AddElementProps>();
const service = useService(ListElementService);
const elementText = ref("");

const { loading, execute } = useAsyncAction(async () => {
  if (!!elementText.value)
    await service.create({
      listId: props.listId,
      title: elementText.value,
      parentId: props.parentId,
    });

  elementText.value = "";
});
</script>

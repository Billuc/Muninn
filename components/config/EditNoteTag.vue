<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title> Edit tag '{{ props.tag?.title }}'</template>
    <template #default>
      <ConfigTagForm
        v-model:title="title"
        v-model:color="color"
        v-model:icon="icon"
        :disabled-colors="disabledColorsWithoutCurrent"
        ref="form"
      />
    </template>
    <template #actions>
      <Button
        class="btn-error ml-2"
        @click="removeTag"
        :loading="updating || removing"
      >
        Remove
      </Button>
      <Button
        class="btn-success ml-2"
        @click="editTag"
        :loading="updating || removing"
      >
        Save
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { type Tag, TagColor } from "~/data/models/Tag";
import { NoteTagService } from "~/data/services/noteTagService";
import type { ConfigTagForm } from "#build/components";

interface EditNoteTagProps {
  tag: Tag | null;
  disabledColors: TagColor[];
}

const props = defineProps<EditNoteTagProps>();
const emit = defineEmits(["close"]);
const service = useService(NoteTagService);
const form = ref<InstanceType<typeof ConfigTagForm> | null>(null);

const isOpened = computed(() => !!props.tag);
const title = ref("");
const color = ref<TagColor>(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const disabledColorsWithoutCurrent = computed(() =>
  props.disabledColors.filter((c) => c !== props.tag?.color)
);

const close = () => emit("close");
const { loading: updating, execute: editTag } = useAsyncAction(async () => {
  if (!props.tag) return;
  if (!form.value?.validate()) return;

  await service.update({
    id: props.tag.id,
    title: title.value,
    color: color.value,
    icon: icon.value,
  });
  close();
});
const { loading: removing, execute: removeTag } = useAsyncAction(async () => {
  if (!props.tag) return;

  await service.remove(props.tag.id);
  close();
});

watchEffect(() => {
  if (props.tag) {
    title.value = props.tag.title;
    color.value = props.tag.color;
    icon.value = props.tag.icon;
  } else {
    title.value = "";
    color.value = TagColor.red;
    icon.value = [faTag.prefix, faTag.iconName];
  }
});
</script>

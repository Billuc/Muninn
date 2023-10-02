<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title> Edit tag '{{ props.tag?.title }}'</template>
    <template #default>
      <TagForm
        v-model:title="title"
        v-model:color="color"
        v-model:icon="icon"
        :disabled-colors="disabledColorsWithoutCurrent"
        ref="form"
      />
    </template>
    <template #actions>
      <Button class="btn-error ml-2" @click="removeTag">Remove</Button>
      <Button class="btn-success ml-2" @click="editTag">Save</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { Tag, TagColor } from "~/models/Tag";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useEventStore } from "~/stores/eventStore";
import TagForm from "./TagForm.vue";

interface EditEventTagProps {
  tag: Tag | null;
  disabledColors: TagColor[];
}

const props = defineProps<EditEventTagProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();
const form = ref<InstanceType<typeof TagForm> | null>(null);

const isOpened = computed(() => !!props.tag);
const title = ref("");
const color = ref<TagColor>(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const disabledColorsWithoutCurrent = computed(() =>
  props.disabledColors.filter((c) => c !== props.tag?.color)
);

const close = () => emit("close");
const editTag = () => {
  if (!props.tag) return;
  if (!form.value?.validate()) return;

  store.editTag(props.tag.id, title.value, color.value, icon.value);
  close();
};
const removeTag = () => {
  if (!props.tag) return;

  store.removeTag(props.tag.id);
  close();
};

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

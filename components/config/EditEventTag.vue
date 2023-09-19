<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title> Edit tag '{{ props.tag?.title }}'</template>
    <template #default>
      <div class="form-control my-4 gap-y-2">
        <TextInput
          label="Tag name"
          :value="title"
          placeholder="Enter name..."
          input-class="border-primary"
          @input="setTitle"
        />
        <TagColorInput
          :disabled-colors="disabledColorsWithoutCurrent"
          :value="color"
          @input="setColor"
        />
        <IconInput :icon="icon" @input="setIcon" />
      </div>
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
import IconInput from "../IconInput.vue";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import TagColorInput from "./TagColorInput.vue";
import { useEventStore } from "~/stores/eventStore";

interface EditEventTagProps {
  tag: Tag | null;
  disabledColors: TagColor[];
}

const props = defineProps<EditEventTagProps>();
const emit = defineEmits(["close"]);
const store = useEventStore();

const isOpened = computed(() => !!props.tag);
const title = ref("");
const color = ref<TagColor>(TagColor.red);
const icon = ref<string[]>([faTag.prefix, faTag.iconName]);

const disabledColorsWithoutCurrent = computed(() =>
  props.disabledColors.filter((c) => c !== props.tag?.color)
);

const setTitle = (newTitle: string) => (title.value = newTitle);
const setColor = (newColor: TagColor) => (color.value = newColor);
const setIcon = (newIcon: string[]) => (icon.value = newIcon);

const close = () => emit("close");
const editTag = () => {
  if (!props.tag) return;

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

<template>
  <Dialog :is-opened="isOpened" @close="close">
    <template #title> Edit tag '{{ props.tag?.title }}'</template>
    <template #default>
      <div class="form-control my-4 gap-y-2">
        <TextInput
          label="Tag name"
          placeholder="Enter name..."
          :value="title"
          @input="setTitle"
        />
        <LazyIconInput :icon="icon ?? undefined" @input="setIcon" />
      </div>
    </template>
    <template #actions>
      <Button class="btn-success ml-2" @click="editTag">Save</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useNoteStore } from "~/stores/noteStore";
import Button from "../Button.vue";
import Dialog from "../Dialog.vue";
import { Tag, TagColor } from "~/models/Tag";

interface EditNoteTagProps {
  tag: Tag | null;
}

const props = defineProps<EditNoteTagProps>();
const emit = defineEmits(["close"]);
const store = useNoteStore();

const isOpened = computed(() => !!props.tag);
const title = ref("");
const color = ref<TagColor>(TagColor.red);
const icon = ref<string[] | null>(null);

const setTitle = (newTitle: string) => (title.value = newTitle);
const setColor = (newColor: TagColor) => (color.value = newColor);
const setIcon = (newIcon: string[]) => (icon.value = newIcon);

const close = () => emit("close");
const editTag = () => {
  if (!props.tag) return;

  store.editTag(props.tag.id, {
    id: props.tag.id,
    color: color.value,
    title: title.value,
    icon: icon.value ?? undefined,
  });
  close();
};

watchEffect(() => {
  if (props.tag) {
    title.value = props.tag.title;
    color.value = props.tag.color;
    icon.value = props.tag.icon ?? null;
  } else {
    title.value = "";
    color.value = TagColor.red;
    icon.value = null;
  }
});
</script>

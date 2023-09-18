<template>
  <div class="pl-4">
    <h3 class="text-xl font-bold mb-4">Tags</h3>

    <div
      :class="mergeClasses('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-2')"
    >
      <TagVue
        v-for="[id, tag] in tags"
        :color="tag.color"
        :icon="tag.icon"
        :text="tag.title"
        @click="() => editTag(tag)"
      />

      <CreateNoteTag v-if="canCreate" :disabled-colors="colorsUsed" />
      <EditNoteTag
        :tag="tagToEdit"
        @close="tagToEdit = null"
        :disabled-colors="colorsUsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNoteStore } from "~/stores/noteStore";
import TagVue from "../Tag.vue";
import CreateNoteTag from "./CreateNoteTag.vue";
import _ from "lodash";
import { Tag, TagColor } from "~/models/Tag";
import EditNoteTag from "./EditNoteTag.vue";

const store = useNoteStore();
const { tags } = storeToRefs(store);
const tagToEdit = ref<Tag | null>(null);

const colorsUsed = computed(() =>
  _.uniq([...tags.value.values()].map((t) => t.color))
);
const canCreate = computed(() =>
  _.some(Object.values(TagColor), (t) => !colorsUsed.value.includes(t))
);

const editTag = (tag: Tag) => (tagToEdit.value = tag);
</script>

<template>
  <div class="pl-4">
    <h3 class="text-xl font-bold mb-4">Tags</h3>

    <div
      :class="
        mergeClasses(
          'relative',
          'grid',
          'grid-cols-2',
          'sm:grid-cols-3',
          'md:grid-cols-4',
          'lg:grid-cols-5',
          'gap-2'
        )
      "
    >
      <TagVue
        v-for="tag in tagArray"
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
import { useNoteStore } from "~/stores/noteStore";
import TagVue from "../TagVue.vue";
import CreateNoteTag from "./CreateNoteTag.vue";
import _ from "lodash";
import { Tag, TagColor, TagOrder } from "~/models/Tag";
import EditNoteTag from "./EditNoteTag.vue";

const store = useNoteStore();
const tagToEdit = ref<Tag | null>(null);

const tagArray = computed(() =>
  _.sortBy(store.tagArray as Tag[], (t) => TagOrder.get(t.color))
);
const colorsUsed = computed(() => _.uniq(tagArray.value.map((t) => t.color)));
const canCreate = computed(() =>
  _.some(Object.values(TagColor), (t) => !colorsUsed.value.includes(t))
);

const editTag = (tag: Tag) => (tagToEdit.value = tag);
</script>

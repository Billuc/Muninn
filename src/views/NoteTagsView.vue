<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import CreateNoteTag from "@/components/notes/tags/CreateNoteTag.vue";
import EditNoteTag from "@/components/notes/tags/EditNoteTag.vue";
import DeleteNoteTag from "@/components/notes/tags/DeleteNoteTag.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { NoteTagService } from "@/data/services/noteTagService";
import TagList from "@/components/common/tags/TagList.vue";
import { Tag } from "@/data/models/Tag";

const noteTagService = useService(NoteTagService);

const selected = ref<Tag | null>(null);
const selectedIndex = ref(-1);

const data = await noteTagService.getAll();
const noteTags = ref(data);
useSubscription(noteTagService, noteTags);

const onSelect = (e: { element: Tag; index: number }) => {
  selected.value = e.element != selected.value ? e.element : null;
  selectedIndex.value = e.index == selectedIndex.value ? -1 : e.index;
};
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="notes" /></template>
      <template #text>Note Tags</template>
    </Title>

    <PageActions>
      <CreateNoteTag />

      <template v-if="!!selected">
        <EditNoteTag :tag="selected" />
        <DeleteNoteTag :tag="selected" @delete="selected = null" />
      </template>
    </PageActions>

    <TagList
      :tags="noteTags"
      @select="onSelect"
      :selected-index="selectedIndex"
    />
  </div>
</template>

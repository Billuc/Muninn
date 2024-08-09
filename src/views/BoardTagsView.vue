<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import CreateBoardTag from "@/components/boards/tags/CreateBoardTag.vue";
import EditBoardTag from "@/components/boards/tags/EditBoardTag.vue";
import DeleteBoardTag from "@/components/boards/tags/DeleteBoardTag.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { BoardTagService } from "@/data/services/boardTagService";
import TagList from "@/components/common/tags/TagList.vue";
import { Tag } from "@/data/models/Tag";

const boardTagService = useService(BoardTagService);

const selected = ref<Tag | null>(null);
const selectedIndex = ref(-1);

const data = await boardTagService.getAll();
const boardTags = ref(data);
useSubscription(boardTagService, boardTags);

const onSelect = (e: { element: Tag; index: number }) => {
  selected.value = e.element != selected.value ? e.element : null;
  selectedIndex.value = e.index == selectedIndex.value ? -1 : e.index;
};
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="boards" /></template>
      <template #text>Board Tags</template>
    </Title>

    <PageActions>
      <CreateBoardTag />

      <template v-if="!!selected">
        <EditBoardTag :tag="selected" />
        <DeleteBoardTag :tag="selected" @delete="selected = null" />
      </template>
    </PageActions>

    <TagList
      :tags="boardTags"
      @select="onSelect"
      :selected-index="selectedIndex"
    />
  </div>
</template>

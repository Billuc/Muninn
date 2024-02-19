<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import CreateEventTag from "@/components/events/tags/CreateEventTag.vue";
import EditEventTag from "@/components/events/tags/EditEventTag.vue";
import DeleteEventTag from "@/components/events/tags/DeleteEventTag.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { EventTagService } from "@/data/services/eventTagService";
import TagList from "@/components/common/tags/TagList.vue";
import { Tag } from "@/data/models/Tag";

const eventTagService = useService(EventTagService);

const selected = ref<Tag | null>(null);
const selectedIndex = ref(-1);

const data = await eventTagService.getAll();
const eventTags = ref(data);
useSubscription(eventTagService, eventTags);

const onSelect = (e: { element: Tag; index: number }) => {
  selected.value = e.element != selected.value ? e.element : null;
  selectedIndex.value = e.index == selectedIndex.value ? -1 : e.index;
};
</script>

<template>
  <div>
    <Title>
      <template #prefix><BackButton name="calendar" /></template>
      <template #text>Event Tags</template>
    </Title>

    <PageActions>
      <CreateEventTag />

      <template v-if="!!selected">
        <EditEventTag :tag="selected" />
        <DeleteEventTag :tag="selected" @delete="selected = null" />
      </template>
    </PageActions>

    <TagList
      :tags="eventTags"
      @select="onSelect"
      :selected-index="selectedIndex"
    />
  </div>
</template>

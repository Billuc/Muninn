<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import PageActions from "@/components/common/PageActions.vue";
import BackButton from "@/components/common/BackButton.vue";
import CreateEventTag from "@/components/events/tags/CreateEventTag.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import DeleteEvent from "@/components/events/DeleteEvent.vue";
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ref } from "vue";
import { EventTagService } from "@/data/services/eventTagService";
import EventTagList from "@/components/events/tags/EventTagList.vue";
import { Tag } from "@/data/models/Tag";

const eventTagService = useService(EventTagService);

const selected = ref<Tag | null>(null);

const data = await eventTagService.getAll();
const eventTags = ref(data);
useSubscription(eventTagService, eventTags);

const onSelect = (e: { element: Tag; index: number }) =>
  (selected.value = e.element != selected.value ? e.element : null);
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
        <EditEvent :event="selected" />
        <DeleteEvent :event="selected" @delete="selected = null" />
      </template>
    </PageActions>

    <EventTagList :tags="eventTags" @select="onSelect" />
  </div>
</template>

<template>
  <LayoutLoading v-if="pending" />
  <div class="pl-4" v-else>
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

      <ConfigCreateEventTag v-if="canCreate" :disabled-colors="colorsUsed" />
      <ConfigEditEventTag
        :tag="tagToEdit"
        @close="tagToEdit = null"
        :disabled-colors="colorsUsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { type Tag, TagColor, TagOrder } from "~/data/models/Tag";
import { EventTagService } from "~/data/services/eventTagService";

const service = useService(EventTagService);
const tagToEdit = ref<Tag | null>(null);

const { pending, data } = useLazyAsyncData(
  "event-tags",
  async () => await service.getAll()
);

const tagArray = computed(() =>
  _.sortBy(data.value ?? [], (t) => TagOrder.get(t.color))
);
const colorsUsed = computed(() => _.uniq(tagArray.value.map((t) => t.color)));
const canCreate = computed(() =>
  _.some(Object.values(TagColor), (t) => !colorsUsed.value.includes(t))
);

const editTag = (tag: Tag) => (tagToEdit.value = tag);
</script>

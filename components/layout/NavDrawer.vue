<template>
  <div
    :class="
      mergeClasses('drawer', leftHanded ? undefined : 'max-md:drawer-end')
    "
  >
    <input type="checkbox" class="drawer-toggle" v-model="drawerOpen" />

    <div class="drawer-content">
      <Page :wide="router.currentRoute.value.path == '/'">
        <template #navbar>
          <NavBar @open="drawerOpen = true" />
        </template>

        <slot></slot>
      </Page>
    </div>

    <div class="drawer-side z-20">
      <label class="drawer-overlay" @click="drawerOpen = false"></label>

      <div
        :class="
          mergeClasses(
            'absolute',
            'bottom-0',
            'md:bottom-auto',
            'top-auto',
            'md:top-0',
            'grid',
            'grid-cols-4',
            'md:grid-cols-2',
            '[&>*:nth-child(3n+1)]:col-start-2',
            'md:[&>*:nth-child(3n+1)]:col-start-1',
            'justify-items-center',
            'md:justify-items-stretch',
            'w-full',
            'md:w-52',
            'p-4',
            'bg-base-300',
            'rounded-t-box',
            'md:rounded-box'
          )
        "
      >
        <NavLink
          href="/journal"
          :icon="faJournalWhills"
          label="Journal"
          color="btn-primary"
        />
        <NavLink
          href="/lists"
          :icon="faCheckSquare"
          label="Lists"
          color="btn-primary"
        />
        <NavLink
          href="/events"
          :icon="faCalendar"
          label="Events"
          color="btn-primary"
        />
        <NavLink
          href="/notes"
          :icon="faLightbulb"
          label="Notes"
          color="btn-primary"
        />
        <NavLink href="/config" :icon="faCog" label="Config" />
        <NavLink :icon="faClose" label="Close" @click="drawerOpen = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  faCalendar,
  faCheckSquare,
  faClose,
  faCog,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar.vue";
import Page from "./Page.vue";
import NavLink from "./NavLink.vue";
import { useGeneralStore } from "~/stores/generalStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useGeneralStore();
const { leftHanded } = storeToRefs(store);

const drawerOpen = ref(false);
</script>

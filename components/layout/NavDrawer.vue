<template>
  <div class="drawer">
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
            'flex',
            'flex-col',
            'flex-nowrap',
            'justify-end',
            'md:justify-start',
            'p-4',
            'md:w-64',
            'min-h-full',
            'bg-base-200',
            'text-base-content'
          )
        "
      >
        <NavLink href="/" class="!p-2">
          <img src="/icon.svg" class="h-full" />
          <span class="hidden md:inline">Muninn</span>
        </NavLink>
        <NavLink href="/journal" :icon="faJournalWhills" label="Journal" />
        <NavLink href="/lists" :icon="faCheckSquare" label="Lists" />
        <NavLink href="/events" :icon="faCalendar" label="Events" />
        <NavLink href="/notes" :icon="faLightbulb" label="Notes" />
        <NavLink href="/config" :icon="faCog" label="Config" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  faCalendar,
  faCheckSquare,
  faCog,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar.vue";
import Page from "./Page.vue";
import NavLink from "./NavLink.vue";

const router = useRouter();

const drawerOpen = ref(false);
</script>

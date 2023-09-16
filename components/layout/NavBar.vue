<template>
  <div
    :class="
      mergeClasses(
        'navbar',
        'justify-center',
        'fixed',
        'top-auto',
        'md:top-0',
        'bottom-0',
        'md:bottom-auto',
        'z-10',
      )
    "
  >
    <NavLink href="/" class="btn-square p-2 shadow" exact>
      <img src="/icon.svg" class="w-full" />
    </NavLink>

    <div class="join shadow mx-2">
      <NavLink
        href="/journal"
        :icon="faJournalWhills"
        color="text-primary"
        class="join-item"
      />
      <NavLink
        href="/todos"
        :icon="faCheckSquare"
        color="text-secondary"
        class="join-item"
      />
      <NavLink
        href="/events"
        :icon="faCalendar"
        color="text-accent"
        class="join-item"
      />
      <NavLink
        href="/notes"
        :icon="faLightbulb"
        color="text-neutral"
        class="join-item"
      />
    </div>

    <NavLink href="/config" :icon="faCog" class="shadow" />
  </div>
</template>

<script setup>
import {
  faCalendar,
  faCheckSquare,
  faCog,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink.vue";
</script>

<template>
  <div class="dropdown dropdown-top md:dropdown-bottom">
    <label tabindex="0" class="btn btn-square md:btn-lg">
      <FontAwesomeIcon :icon="faBars" />
    </label>

    <div
      tabindex="0"
      :class="
        mergeClasses(
          'dropdown-content',
          'z-20',
          'bg-base-100',
          'flex',
          'flex-col',
          'gap-y-2',
          'my-2',
          'rounded-box'
        )
      "
    >
      <NavLink href="/journal" :icon="faJournalWhills" color="text-primary">
        Journal
      </NavLink>
      <NavLink href="/todos" :icon="faCheckSquare" color="text-secondary">
        Lists
      </NavLink>
      <NavLink href="/events" :icon="faCalendar" color="text-accent">
        Events
      </NavLink>
      <NavLink href="/notes" :icon="faLightbulb" color="text-neutral">
        Notes
      </NavLink>
      <NavLink href="/config" :icon="faCog">Config</NavLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  faBars,
  faCalendar,
  faCheckSquare,
  faCog,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavLink from "./NavLink.vue";
</script>

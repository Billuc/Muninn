<template>
  <div
    :class="
      mergeClasses(
        'navbar',
        'bg-base-300',
        'justify-center',
        'fixed',
        'top-auto',
        'md:top-0',
        'bottom-0',
        'md:bottom-auto',
        'z-10'
      )
    "
  >
    <LayoutNavLink href="/">Muninn</LayoutNavLink>

    <div class="join shadow mx-2">
      <LayoutNavLink
        href="/journal"
        :icon="faJournalWhills"
        color="text-primary"
        class="join-item"
      />
      <LayoutNavLink
        href="/todos"
        :icon="faCheckSquare"
        color="text-secondary"
        class="join-item"
      />
      <LayoutNavLink
        href="/events"
        :icon="faCalendar"
        color="text-accent"
        class="join-item"
      />
      <LayoutNavLink
        href="/notes"
        :icon="faLightbulb"
        color="text-neutral"
        class="join-item"
      />
    </div>

    <LayoutThemeSelector />
  </div>
</template>

<script setup>
import {
  faCalendar,
  faCheckSquare,
  faJournalWhills,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
</script>

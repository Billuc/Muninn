<template>
  <div
    :class="
      mergeClasses(
        'my-navbar',
        'bg-base-200',
        'flex',
        'justify-start',
        'items-center',
        'fixed',
        'top-auto',
        'md:top-0',
        'bottom-0',
        'md:bottom-auto',
        'z-10',
        'my-2'
      )
    "
  >
    <NavDropdown />
    <NavLink href="/" class="btn-square !p-2" exact>
      <img src="/icon.svg" class="w-full" />
    </NavLink>
    <span class="text-3xl font-extrabold px-4">Muninn</span>
  </div>
</template>

<script setup>
import NavLink from "./NavLink.vue";
import NavDropdown from "./NavDropdown.vue";
</script>

<style>
.my-navbar {
  border-radius: 0.5rem;
}
.my-navbar:before {
  content: "";
  position: absolute;
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  background: inherit;
  transform: skewX(-30deg);
  transform-origin: bottom left;
  border-radius: inherit;
  z-index: -1;
}
</style>

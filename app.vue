<template>
  <div class="bg-base-200">
    <NuxtLayout>
      <LayoutNavBar />
      <div
        :class="
          mergeClasses(
            'pb-20',
            'md:pb-4',
            'pt-4',
            'md:pt-20',
            'mx-auto',
            'w-full',
            'min-h-screen',
            'md:w-2/3',
            'px-4',
            'bg-base-100'
          )
        "
      >
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

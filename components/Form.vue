<template>
  <div class="form-control gap-y-2">
    <input type="text" autofocus="true" style="display: none" />

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";

const fields = new Map<number, Ref<boolean>>();

const bind = (uid: number, valid: Ref<boolean>) => fields.set(uid, valid);
const unbind = (uid: number) => fields.delete(uid);
provide("form", { bind, unbind });

const validate = () => {
  return _.every([...fields.values()], (v) => v.value);
};
defineExpose({ validate });
</script>

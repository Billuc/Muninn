<template>
  <div class="markdown-editor">
    <textarea :id="textareaId" />
  </div>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import _ from "lodash";

interface MarkdownEditorProps {
  value: string;
  placeholder?: string;
}

const props = defineProps<MarkdownEditorProps>();
const emit = defineEmits(["update:value"]);

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/easymde@2.12.0/dist/easymde.min.css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/easymde@2.12.0/dist/easymde.min.js",
    },
  ],
});
const toggled = ref(false);
const mde = ref<EasyMDE | undefined>(undefined);

const textareaId = _.uniqueId("textarea");
const previewButtonId = _.uniqueId("mde-preview");
const easyMDEOptions: EasyMDE.Options = {
  initialValue: props.value,
  placeholder: props.placeholder,
  toolbar: [
    "bold",
    "italic",
    "strikethrough",
    "heading",
    "|",
    "unordered-list",
    "ordered-list",
    "quote",
    "code",
    "|",
    "link",
    "image",
    "table",
    "horizontal-rule",
    "|",
    {
      name: "preview",
      className: "fa fa-edit",
      action: togglePreview,
      title: "Edit",
      attributes: {
        id: previewButtonId,
      },
      noDisable: true,
    },
  ],
};

function togglePreview() {
  toggled.value = !toggled.value;
  EasyMDE.togglePreview(mde.value!);

  if (toggled.value)
    document.getElementById(previewButtonId)?.classList.remove("active");
  else document.getElementById(previewButtonId)?.classList.add("active");
}

onMounted(() => {
  mde.value = new EasyMDE({
    ...easyMDEOptions,
    element: document.getElementById(textareaId) ?? undefined,
  });
  mde.value.codemirror.on("change", () => {
    emit("update:value", mde.value!.value());
  });

  togglePreview();
});
</script>

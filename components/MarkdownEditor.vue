<template>
  <div class="markdown-editor" ref="editor">
    <textarea :id="textareaId" />
  </div>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import _ from "lodash";

interface MarkdownEditorProps {
  value: string;
  placeholder?: string;
  editing: boolean;
}

const props = defineProps<MarkdownEditorProps>();
const emit = defineEmits(["update:value"]);
const { editing, value } = toRefs(props);

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
const mde = ref<EasyMDE | undefined>(undefined);
const editor = ref<HTMLElement | null>(null);

const textareaId = _.uniqueId("textarea");
const easyMDEOptions: EasyMDE.Options = {
  initialValue: props.value,
  placeholder: props.placeholder,
  previewClass: ["editor-preview", "prose", "max-w-full"],
  spellChecker: false,
  forceSync: true,
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
  ],
};

function syncPreview() {
  // preview = !editing
  if (mde.value!.isPreviewActive() === editing.value)
    EasyMDE.togglePreview(mde.value!);

  if (editing.value) {
    editor.value
      ?.getElementsByClassName("editor-toolbar")[0]
      ?.classList.add("active");
  } else {
    editor.value
      ?.getElementsByClassName("editor-toolbar")[0]
      ?.classList.remove("active");
  }
}

onMounted(() => {
  mde.value = new EasyMDE({
    ...easyMDEOptions,
    element: document.getElementById(textareaId) ?? undefined,
  });
  mde.value.codemirror.on("change", () => {
    emit("update:value", mde.value!.value());
  });

  syncPreview();
});

watch([editing], () => {
  syncPreview();
});
watch([value], () => {
  if (mde.value?.value() !== value.value) mde.value?.value(value.value);
});
</script>

<style>
.markdown-editor .editor-toolbar {
  max-height: 0;
  opacity: 0;
  transition: all ease-in-out 0.5s;
}

.markdown-editor .editor-toolbar.active {
  max-height: 100px;
  opacity: 1;
}

.markdown-editor .CodeMirror {
  border-radius: 4px;
}
</style>

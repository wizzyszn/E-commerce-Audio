<template>
    <div>
      <EditorContent :editor="editor" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { EditorContent, useEditor } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  
  // Define props and emits
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  
  // Initialize Tiptap editor
  const editor = useEditor({
    content: props.modelValue,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      console.log('Updated Content:', updatedContent);
      emit('update:modelValue', updatedContent);
    },
  });
  
  // Log initial content
  onMounted(() => {
    console.log('Initial Content:', props.modelValue);
  });
  
  </script>
  
  <style scoped>
  /* Add any styles for the editor here */
  .editor-content {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 200px;
    margin-top: 8px;
  }
  </style>
  
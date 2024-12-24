<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    timeout="2000"
    rounded="pill"
  >
    <p class="font-bold text-black text-center">{{ message }}</p>

    <template v-slot:actions>
      <v-btn
        color="gray"
        variant="text"
        @click="visible = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue'

  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value: string) => ['error', 'success'].includes(value),
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const visible = ref(props.modelValue)

  watch(
    () => props.modelValue,
    (newVal) => {
      visible.value = newVal
    },
  )

  const color = computed(() => {
    return props.type === 'success' ? 'green' : 'red'
  })

  watch(visible, (newVal) => {
    emit('update:modelValue', newVal)
  })
</script>

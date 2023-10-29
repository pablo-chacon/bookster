/**
* Inputfield component.
*/

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      required: true
    },
    type: {
      default: 'text'
    },
    placeholder: {
      default: ''
    },
    updateValue: {
      default: undefined
    }
  },

  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      if (target) {
        this.$emit('update:value', target.value)
      }
    }
  }
})
</script>

<template>
    <div>
      <input :type="type" :value="value" @input="handleInput($event)" :placeholder="placeholder" />
    </div>
  </template>

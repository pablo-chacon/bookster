<template>
  <div>
    <h2>{{ book.title }}</h2>
    <p>Author: {{ book.author }}</p>
    <p>Quantity: {{ book.quantity }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Book } from '@/model/book'

export default defineComponent({
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  }
})
</script>

/**
* admin operation "Add new book" modal pop-up. 
*/

<script lang="ts">
import { defineComponent } from 'vue'
import InputFieldItem from './InputFieldItem.vue'
import { addBook } from '@/service/bookservice'
export default defineComponent({
  components: {
    InputFieldItem
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: '',
      author: '',
      quantity: 0
    }
  },
  methods: {
    hideModal() {
      this.$emit('close')
    },
    addNewBook() {
      const newBook = {
        title: this.title,
        author: this.author,
        quantity: this.quantity
      }
     
      addBook(newBook, this.token)
            this.$emit('bookAdded')
    }
  }
})
</script>
<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Add New Book</h2>
      <form @submit.prevent="addNewBook">
        <InputFieldItem
          :value="title"
          @update:value="title = $event"
          type="text"
          placeholder="Title"
          required
        />
        <InputFieldItem
          :value="author"
          @update:value="author = $event"
          type="text"
          placeholder="Author"
          required
        />
        <InputFieldItem
          :value="quantity"
          @update:value="quantity = $event"
          type="number"
          placeholder="Quantity"
          required
        />
        <button type="submit">Add Book</button>
        <button @click="hideModal">Close</button>
      </form>
    </div>
  </div>
</template>


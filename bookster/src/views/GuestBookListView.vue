/**
* Guest view.
*/

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Book } from '../model/book'
import NavBarItem from '@/components/NavBarItem.vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import { searchBooks, getBooks, orderBook } from '../service/bookservice'

//Define the vue components.
export default defineComponent({
  components: {
    NavBarItem,
    InputFieldItem
  },
  setup() {
    //Reactive vars ref.Holding book as array.
    const books = ref<Book[]>([])
    const searchInput = ref('')
    //InputField search.
    const showSearchedBooks = () => {
      const inputValue = searchInput.value
      searchBooks(inputValue)
        .then((searchedBooks) => {
          books.value = searchedBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //Retrieve all books.
    const showBooks = () => {
      getBooks()
        .then((responseBooks) => {
          books.value = responseBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // Check order quantity towards inventory quantity.
    const orderSelectedBook = (book: Book) => {
      const quantity = book.orderQuantity
      if (quantity && quantity > 0) {
        orderBook(book.title, quantity)
          .then(() => {
            book.orderQuantity = undefined
            console.log(quantity)

            showBooks()
          })
          .catch((error) => {
            console.error('An error occured while ordering the book', error)
          })
      }
    }
    //Show books component if mounted.
    onMounted(showBooks)

    return {
      books,
      showBooks,
      showSearchedBooks,
      searchInput,
      orderSelectedBook
    }
  }
})
</script>

<template>
  <div>
    <nav>
      <NavBarItem />
    </nav>
    <div class="search-field">
      <InputFieldItem
        v-model:value="searchInput"
        :placeholder="'Search literature'"
        @update:value="showSearchedBooks"
      />
    </div>
    <div class="book-table">
      <table>
        <thead>
          <tr class="headers">
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.title">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td class="quantity">{{ book.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.book-table {
  display: flex;
  justify-content: center;
}
.search-field{
    width: 15rem;
    display: flex;
  justify-content: center;
  margin-left: 16.5rem;
  margin-bottom: 1rem;
}
td,
th {
  background-color: rgb(197, 243, 222);
  height: 2rem;
}
</style>

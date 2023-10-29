/** * Component admin view, booklist, order, edit, delete. */

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Book } from '@/model/book'
import NavBarItem from '@/components/NavBarItem.vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import { isAdmin } from '@/utils/isAdmin'
import { useRouter } from 'vue-router'
import { searchBooks, getBooks, deleteBook, orderBook } from '../service/bookservice'
import AddBookModal from '@/components/AddBookModal.vue'
export default defineComponent({
  components: {
    NavBarItem,
    InputFieldItem,
    AddBookModal
  },
  setup() {
    const router = useRouter()
    const books = ref<Book[]>([])
    const searchInput = ref('')
    const selectedBook = ref<Book | null>(null)
    const isAddModalVisible = ref(false)
    const apiToken = localStorage.getItem('accessToken')

    // Display search history.
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

    //Get books.
    const showBooks = () => {
      getBooks()
        .then((responseBooks) => {
          books.value = responseBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //Check orderQuantity = > 0.
    const orderSelectedBook = (book: Book) => {
      const quantity = book.orderQuantity
      if (quantity && quantity > 0) {
        orderBook(book.title, quantity)
          .then(() => {
            book.orderQuantity = undefined
            showBooks()
          })
          .catch((error) => {
            console.error('An error occured while ordering the book', error)
          })
      }
    }
    const showAddModal = () => {
      isAddModalVisible.value = true
    }

    const handleBookAdded = () => {
  showBooks()
  isAddModalVisible.value = false
}

    //Check title deletion.
    const deleteSelectedBook = (book: Book) => {
      deleteBook(book.title)
        .then(() => {
          books.value = books.value.filter((b) => b.title !== book.title)
          selectedBook.value = null
          showBooks()
        })
        .catch((error) => {
          console.error('Deletion Error..', error)
        })
    }

    onMounted(() => {
      if (!isAdmin()) {
        router.push('/library/books')
        console.log('Redirected to non-admin page')
      } else {
        showBooks()
      }
    })

    return {
      books,
      showBooks,
      showSearchedBooks,
      searchInput,
      selectedBook,
      showAddModal,
      apiToken,
      handleBookAdded,
      isAddModalVisible,
      deleteSelectedBook,
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
    <div class="extra-nav">
      <div class="search-field">
        
      </div>

      <button class="add-btn" @click="showAddModal">Add new book</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
            <th>Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.title">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td class="quantity">{{ book.quantity }}</td>
            <td class="order-column">
              <input class="order-input" type="number" v-model="book.orderQuantity" min="1" />
              <button @click="orderSelectedBook(book)">Order</button>
            </td>
            <td>
              <button>Edit</button>
              <button @click="deleteSelectedBook(book)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal-overlay" v-if="isAddModalVisible">
        <div class="modal-content">
          <add-book-modal
            :token="apiToken"
            @bookAdded="handleBookAdded"
            @close="handleBookAdded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-input {
  width: 50%;
  margin-right: 0.5rem;
}
.extra-nav {
  margin-left: 4.2rem;
}

.search-field {
  width: 15rem;
}
.add-btn {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 7.5rem;
  height: 1.5rem;
}

table {
  width: 90%;
  margin-left: 4rem;
  margin-right: 4rem;
}

thead {
  background-color: rgb(17, 17, 17);
  width: 100%;
}

th {
  background-color: rgb(138, 179, 246);
}
td {
  padding: 0.5rem;
  background-color: rgb(159, 192, 244);
}

.books-page {
  position: relative;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
}

.books-list {
  position: relative;
  z-index: 1;
  margin-top: 2rem;
}
</style>

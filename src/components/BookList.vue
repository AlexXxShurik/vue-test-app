<template>
  <div class="product-list">
    <h1 class="title">Список товаров</h1>

    <!-- Фильтрация и сортировка -->
    <div class="filter-sort-container">
      <div class="filter">
        <label for="integration-filter">Фильтр по интеграции:</label>
        <select v-model="selectedIntegration" id="integration-filter">
          <option value="">Все</option>
          <option value="reels">Reels</option>
          <option value="stories">Stories</option>
        </select>
      </div>
      <div class="sort">
        <label for="sort-order">Сортировка по:</label>
        <select v-model="sortOrder" id="sort-order">
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="pagination-container">
      <div class="pagination">
        <button class="pagination-button" @click="previousPage" :disabled="currentPage === 1">Назад</button>
        <span class="page-info">Страница {{ currentPage }} из {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Вперед</button>
      </div>
      <button class="add-button" @click="goToAddProduct">Добавить товар</button>
    </div>

    <ul class="book-list">
      <li v-for="book in paginatedBooks" :key="book.id" class="book-item">
        <div class="book-card">
          <div class="book-details">
            <h2 class="book-title">{{ book.name }}</h2>
            <p class="book-seller">Издатель: {{ book.seller }}</p>
            <p class="book-format">Формат: {{ book.integration }}</p>
          </div>
          <div class="book-actions">
            <button class="edit-button" @click="editBook(book.id)">Редактировать</button>
            <button class="delete-button" @click="deleteBook(book.id)">Удалить</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      books: [],
      currentPage: 1,
      pageSize: 20,
      selectedIntegration: '',
      sortOrder: 'asc',
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => {
        return this.selectedIntegration === '' || book.integration === this.selectedIntegration;
      });
    },
    sortedBooks() {
      // Создаем копию массива для сортировки
      const booksCopy = [...this.filteredBooks];
      return booksCopy.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedBooks.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedBooks.length / this.pageSize);
    }
  },
  methods: {
    goToAddProduct() {
      this.$router.push('/add');
    },
    editBook(id) {
      this.$router.push(`/edit/${id}`);
    },
    deleteBook(id) {
      this.books = this.books.filter(book => book.id !== id);
      this.saveBooksToLocalStorage();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    addBook(newBook) {
      this.books.push({
        id: Date.now(),
        ...newBook
      });
      this.saveBooksToLocalStorage();
    },
    saveBooksToLocalStorage() {
      console.log('Saving books to localStorage:', this.books);
      localStorage.setItem('books', JSON.stringify(this.books));
    },
    loadBooksFromLocalStorage() {
      const booksFromStorage = localStorage.getItem('books');
      if (booksFromStorage) {
        this.books = JSON.parse(booksFromStorage);
      }
    }
  },
  mounted() {
    this.loadBooksFromLocalStorage();
    eventBus.on('add-product', this.addBook);
  },
  beforeUnmount() {
    eventBus.off('add-product', this.addBook);
  }
};
</script>

<style>
.product-list {
  max-width: calc(80% - 20px);
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.filter-sort-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.filter, .sort {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter label, .sort label {
  margin-right: 10px;
  font-size: 12px;
}

.filter select, .sort select {
  padding: 2px;
  font-size: 0.6em;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.add-button {
  padding: 5px 10px;
  font-size: 0.8em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.book-list {
  list-style-type: none;
  padding: 0;
}

.book-item {
  margin-bottom: 20px;
}

.book-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-details {
  margin-bottom: 10px;
}

.book-title {
  font-size: 1.2em;
  margin: 0;
  color: #333;
}

.book-seller,
.book-format {
  margin: 5px 0;
  color: #555;
}

.book-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
  align-items: center;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}

.edit-button {
  background-color: #28a745;
}

.edit-button:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  padding: 5px 10px;
  font-size: 0.6em;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  margin: 0 10px;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.6em;
  color: #333;
}

@media (min-width: 768px) {
  .filter-sort-container {
    flex-direction: row;
    justify-content: space-between;
  }

  .filter, .sort {
    flex-direction: row;
  }

  .filter label, .sort label {
    font-size: 14px;
  }

  .filter select, .sort select {
    padding: 3px;
    font-size: 0.7em;
  }

  .pagination-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .pagination-button {
    padding: 8px 16px;
    font-size: 0.9em;
  }

  .page-info {
    font-size: 0.9em;
  }

  .add-button {
    padding: 10px 20px;
    font-size: 1em;
  }

  .book-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .book-details {
    margin-bottom: 0;
  }

  .book-actions {
    align-items: center;
    margin-left: auto;
  }
}

</style>

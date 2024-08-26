<template>
    <div class="edit-product">
      <h2 class="title">Редактировать товар</h2>
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="name">Название товара:</label>
          <input type="text" v-model="product.name" id="name" required />
        </div>
        <div class="form-group">
          <label for="seller">Продавец:</label>
          <input type="text" v-model="product.seller" id="seller" required />
        </div>
        <div class="form-group">
          <label for="integration">Способ интеграции:</label>
          <select v-model="product.integration" id="integration" required>
            <option value="reels">Reels</option>
            <option value="stories">Stories</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          id: null,
          name: '',
          seller: '',
          integration: 'reels',
        },
      };
    },
    methods: {
      updateProduct() {
        const booksFromStorage = localStorage.getItem('books');
        const books = booksFromStorage ? JSON.parse(booksFromStorage) : [];
  
        const index = books.findIndex(book => book.id === this.product.id);
  
        if (index !== -1) {
          books[index] = { ...this.product };
          localStorage.setItem('books', JSON.stringify(books));
          this.$router.push('/');
        }
      },
      loadProduct() {
        const id = parseInt(this.$route.params.id, 10);
        const booksFromStorage = localStorage.getItem('books');
        const books = booksFromStorage ? JSON.parse(booksFromStorage) : [];
        const product = books.find(book => book.id === id);
  
        if (product) {
          this.product = { ...product };
        } else {
          this.$router.push('/');
        }
      },
    },
    mounted() {
      this.loadProduct();
    },
  };
  </script>
  
  <style scoped>
  .edit-product {
    max-width: calc(80% - 20px);
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 1.5em;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  input[type="text"],
  select {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9em;
  }
  
  input[type="text"]:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  /* Адаптивность для больших экранов */
  @media (min-width: 768px) {
    .form-title {
      font-size: 1.8em;
    }
  
    .form-group {
      margin-bottom: 20px;
    }
  
    label {
      font-size: 14px;
    }
  
    input[type="text"],
    select {
      padding: 12px;
      font-size: 1em;
    }
  
    .submit-button {
      font-size: 1.1em;
      padding: 12px 24px;
    }
  }
  </style>
  
  
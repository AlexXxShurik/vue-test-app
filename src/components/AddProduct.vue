<template>
  <div class="add-product-form">
    <h2 class="form-title">Добавить товар</h2>
    <form @submit.prevent="addProduct">
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
      <button type="submit" class="submit-button">Добавить товар</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        seller: '',
        integration: 'reels',
      },
    };
  },
  methods: {
    addProduct() {
      const booksFromStorage = localStorage.getItem('books');
      const books = booksFromStorage ? JSON.parse(booksFromStorage) : [];
      const newProduct = {
        id: Date.now(),
        ...this.product,
      };
      books.push(newProduct);
      localStorage.setItem('books', JSON.stringify(books));
      this.product.name = '';
      this.product.seller = '';
      this.product.integration = 'reels';
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.add-product-form {
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

button.submit-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button.submit-button:hover {
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

  button.submit-button {
    font-size: 1.1em;
    padding: 12px 24px;
  }
}
</style>

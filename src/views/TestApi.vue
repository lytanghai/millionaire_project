<script setup>
import { ref } from 'vue'
import axios from 'axios'

const response = ref(null)
const error = ref(null)
const loading = ref(false)

// Replace with your actual JWT
const API_TOKEN = localStorage.getItem('jwt_token')


const callTestApi = async () => {
  loading.value = true
  error.value = null
  response.value = null

  try {
    const res = await axios.post(
      'http://localhost:8080/millionaire_project/service/trigger',
      {
        topic_name: 'related_news',
        provider_name: 'coin_market_cap',
        payload: {
          topic_operation: 'CMC_MARKET_PAIR_LATEST',
          type: 'coin',
          currency: 'BNB',
          coin: 'bnb'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    )
    response.value = res.data
    console.log('API Response:', res.data)
  } catch (err) {
    console.error('Error calling API:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <button @click="callTestApi" :disabled="loading">
      {{ loading ? 'Calling API...' : 'Call Test API' }}
    </button>

    <div v-if="response" class="response">
      <h3>Response:</h3>
      <pre>{{ response }}</pre>
    </div>

    <div v-if="error" class="error">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #eb8b25;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.response, .error {
  margin-top: 1rem;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
</style>

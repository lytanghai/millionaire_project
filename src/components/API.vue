<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { backend_url } from '@/assets/data/common'

// Backend base URL

// Form fields
const apiUrl = ref('')
const headers = ref([{ key: '', value: '' }])
const payload = ref('')
const method = ref('POST')

// Responses
const apiResponse = ref(null)      // response from the proxied API
const backendResponse = ref(null)  // full backend response
const errorMsg = ref('')
const loading = ref(false)

// Add/remove header
function addHeaderField() {
  headers.value.push({ key: '', value: '' })
}
function removeHeaderField(index) {
  headers.value.splice(index, 1)
}

// Send request to backend /test
async function sendRequest() {
  try {
    errorMsg.value = ''
    apiResponse.value = null
    backendResponse.value = null
    loading.value = true

    // Build headers object
    const headersObj = {}
    headers.value.forEach(h => {
      if (h.key && h.value) headersObj[h.key] = h.value
    })

    const res = await axios.post(`${backend_url}/test`, {
      url: apiUrl.value,
      method: method.value,
      headers: headersObj,
      body: payload.value ? JSON.parse(payload.value) : null
    })

    backendResponse.value = res.data               // full backend response
    apiResponse.value = res.data.data || res.data  // proxied API data
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6 font-sans">
    <h1 style="color: #fff">🚀 Modern API Tester</h1>

    <!-- URL & Method Card -->
    <div class="bg-white shadow-lg rounded-xl p-6 space-y-4 border-l-4 border-indigo-500">
      <div>
        <label style="color: #fff">API URL:</label>
        <input v-model="apiUrl" type="text" placeholder="https://api.example.com/endpoint"
               class="border rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-300 outline-none transition" />
      </div>
      <div>
        <label style="color: #fff">Method:</label>
        <select v-model="method" class="border rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-300 outline-none transition">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
    </div>

    <!-- Headers Card -->
    <div class="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 space-y-3">
      <h2 style="color: #fff">Headers</h2>
      <div v-for="(h, index) in headers" :key="index" class="flex gap-2 mb-2">
        <input v-model="h.key" type="text" placeholder="Key"
               class="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-green-200 outline-none transition" />
        <input v-model="h.value" type="text" placeholder="Value"
               class="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-green-200 outline-none transition" />
        <button @click="removeHeaderField(index)"
                class="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600 transition">X</button>
      </div>
      <button @click="addHeaderField"
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">+ Add Header</button>
    </div>

    <!-- Payload Card -->
    <div class="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 space-y-2">
      <h2 style="color: #fff">Payload (JSON)</h2>
      <textarea v-model="payload" rows="5" placeholder='{ "key": "value" }'
                class="border rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-200 outline-none transition font-mono"></textarea>
    </div>

    <!-- Send Button -->
    <div class="text-center">
      <button @click="sendRequest"
              class="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold shadow-lg">
        {{ loading ? 'Sending...' : 'Send Request' }}
      </button>
    </div>

    <!-- API Response Card -->
    <div v-if="apiResponse" class="bg-gray-50 shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
      <h2 style="color: #fff">Proxied API Response</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">{{ apiResponse }}</pre>
    </div>

    <!-- Backend Response Card -->
    <div v-if="backendResponse" class="bg-gray-50 shadow-lg rounded-xl p-6 border-l-4 border-purple-500">
      <h2 style="color: #fff">Backend Full Response</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">{{ backendResponse }}</pre>
    </div>

    <!-- Error Message -->
    <div v-if="errorMsg" style="color: #fff">{{ errorMsg }}</div>
  </div>
</template>

<style scoped>
/* Base */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

/* Container */
.api-tester {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cards */
.card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  border-left: 6px solid #6366f1; /* default accent color */
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
}

/* Colored borders for sections */
.card.url { border-left-color: #6366f1; }       /* Indigo */
.card.headers { border-left-color: #10b981; }   /* Green */
.card.payload { border-left-color: #f59e0b; }   /* Yellow */
.card.api-response { border-left-color: #3b82f6; } /* Blue */
.card.backend-response { border-left-color: #8b5cf6; } /* Purple */

/* Headings */
.card h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

/* Inputs & Textareas */
input[type="text"], select, textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}
input[type="text"]:focus,
select:focus,
textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
}

/* Buttons */
button {
  cursor: pointer;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  transition: all 0.2s ease;
}
button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
button.send {
  background-color: #6366f1;
  color: #fff;
}
button.add-header {
  background-color: #10b981;
  color: #fff;
}
button.remove-header {
  background-color: #ef4444;
  color: #fff;
}

/* Response boxes */
pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #1f2937;
}

/* Error message */
.error-msg {
  color: #ef4444;
  font-weight: 600;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
  button {
    width: 100%;
  }
}
</style>

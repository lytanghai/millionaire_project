<template>
    <div class="related-news-popup" @click.self="$emit('close')">
        <div class="popup-content">
            <h3 class="title-with-image">
                Related News for {{ coin }}
                <img :src="coinImageUrl" :alt="coin" class="coin-image" />
            </h3>

            <p>This would display fetched news for <strong>{{ coin }}</strong>.</p>

            <button class="close-button" @click="$emit('close')">Close</button>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap.js'

const props = defineProps({
    coin: String
})

const coinImageUrl = computed(() => coinImageMap[props.coin] || '')

const newsData = ref([])
const loading = ref(false)
const error = ref(null)

const API_TOKEN = 'c8bd94567a0599c63ef81279d2d0068cd2d85c5d'

const fetchNews = async () => {
    if (!props.coin) return

    loading.value = true
    error.value = null
    newsData.value = []

    try {
        const url = `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${API_TOKEN}&currencies=${props.coin}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        // 🔍 Log full API response for debugging
        console.log('Fetched news JSON:', JSON.stringify(data, null, 2))

        newsData.value = data.results || []
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

// Fetch news when coin changes or on first load
watch(() => props.coin, fetchNews, { immediate: true })
</script>


<style scoped>
.related-news-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup-content {
    background-color: white;
    color: black;
    padding: 2rem;
    border-radius: 12px;
    width: 95%;
    height: 70%;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    overflow-y: auto;
}

.title-with-image {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.coin-image {
    width: 28px;
    height: 28px;
    object-fit: contain;
}

.close-button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #eb6a25;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.close-button:hover {
    background-color: #1dd89a;
}
</style>

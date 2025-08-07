<template>
    <div class="related-news-popup" @click.self="$emit('close')">
        <div class="popup-content">
            <h3 class="title-with-image">
                Related News for {{ coin }}
                <img :src="coinImageUrl" :alt="coin" class="coin-image" />
            </h3>

            <div v-if="loading">🔄 Loading news...</div>

            <div v-else-if="error" class="error-message">❌ {{ error }}</div>

            <div v-else>
                <div v-if="newsData.length === 0">No news found for {{ coin }}.</div>

                <div v-for="item in newsData" :key="item.id" class="news-item">
                    <p class="news-date">Date {{ formatDate(item.published_at) }}</p>
                    <p class="news-title">Title {{ item.title }}</p>
                    <p class="news-description">{{ item.description || 'No description available.' }}</p>
                    <hr />
                </div>
            </div>

            <button class="close-button" @click="$emit('close')">Close</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap.js'
import { formatDate } from '@/assets/data/dateUtil'

const props = defineProps({
    coin: String
})

const coinImageUrl = computed(() => coinImageMap[props.coin] || '')

const newsData = ref([])
const loading = ref(false)
const error = ref(null)

const API_TOKEN = import.meta.env.VITE_CRYPTOPANIC_API_KEY
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
    height: 100vh; /* FULL height */
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    overflow-y: auto; /* <--- Add this to allow scrolling */
    padding: 1rem;    /* Some padding to avoid cutoffs on small screens */
}

.popup-content {
    background-color: white;
    color: black;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: none;        /* Remove height limit */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    margin-top: auto;
    align-self: flex-end;
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

.news-item {
    margin-bottom: 1.25rem;
}

.news-date,
.news-title,
.news-description {
    margin: 0.2rem 0;
}

.news-date {
    font-weight: 600;
    color: #666;
}

.news-title {
    font-weight: 700;
    font-size: 1.1rem;
    color: #222;
}

.news-description {
    font-size: 0.95rem;
    color: #444;
}

hr {
    border: none;
    border-bottom: 1px solid #ddd;
    margin: 1rem 0;
}

@media (max-width: 600px) {
    
}

</style>

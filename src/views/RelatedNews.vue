<template>
    <div class="related-news-popup" @click.self="$emit('close')">
        <div class="popup-content">
            <h3 class="title-with-image">
                Related News for {{ coin }}
                <img v-if="coinImageUrl" :src="coinImageUrl" :alt="coin" class="coin-image" />
            </h3>

            <div v-if="loading">🔄 Loading news...</div>

            <div v-else-if="error" class="error-message">❌ {{ error }}</div>

            <div v-else>
                <div v-if="newsData.length === 0" class="no-news-message">
                    No news found for {{ coin }}.
                </div>

                <div v-else>
                    <div v-for="item in newsData" :key="item.id" class="news-item">
                        <p class="news-date">Date {{ formatDate(item.published_at) }}</p>
                        <p class="news-title">Title {{ item.title }}</p>
                        <p class="news-description">{{ item.description || 'No description available.' }}</p>
                        <hr />
                    </div>
                </div>
            </div>

            <button class="close-button" @click="$emit('close')">Close</button>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch, handleError } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap.js'
import { formatDate } from '@/assets/data/dateUtil'

import { handleAuthError } from '@/assets/data/common'

const props = defineProps({
    coin: String,
    filter: {
        type: String,
        default: ''
    },
    kind: {
        type: String,
        default: 'all'
    }
})

const coinImageUrl = computed(() => coinImageMap[props.coin] || '')

const newsData = ref([])
const loading = ref(false)
const error = ref(null)

// Put your real token here or get dynamically if needed
const API_TOKEN = localStorage.getItem('jwt_token')

const fetchNews = () => {
    if (!props.coin) return

    loading.value = true
    error.value = null
    newsData.value = []

    const body = {
        topic_name: 'related_news',
        provider_name: 'crypto_panic',
        payload: {
            type: 'coin',
            currency: props.coin,
            ...(props.filter ? { filter: props.filter } : {}),
            ...(props.kind && props.kind !== 'all' ? { kind: props.kind } : {}),
            test: true
        }
    }

    fetch('http://localhost:8080/millionaire_project/service/trigger', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
            // other headers if needed
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            // Fix here: assign the nested results array
            newsData.value = data?.data?.content?.data?.content?.results || []
        })
        .catch(err => {
            handleAuthError(err)
        })
        .finally(() => {
            loading.value = false
        })
}

watch(
    () => [props.coin, props.filter, props.kind],
    fetchNews,
    { immediate: true }
)
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

    padding: 1rem;
}

.popup-content {
    background-color: white;
    color: black;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    overflow-y: auto;
}

.title-with-image {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    background-color: rgb(226, 164, 164);
    border-radius: 12px;
    padding: .5rem
}

.coin-image {
    width: 28px;
    height: 28px;
    object-fit: contain;
}

.close-button {
    position: sticky;
    bottom: 0;
    background-color: #eb6a25;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-end;
    margin-top: 1rem;
    z-index: 1;
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
    color: #736d6d;
    padding: .3rem;
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

@media (max-width: 480px) {
    .popup-content {
        position: absolute;
        left: 3%;
        top: 10%;
        padding: 1rem;
        width: 390px;
        height: 80%;
    }
}
</style>

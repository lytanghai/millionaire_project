<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap'
import RelatedNews from '@/views/RelatedNews.vue'

const showRelatedNews = ref(false)
const customCoin = ref('')
const selectedCoin = ref('')
const step = ref(1)
const theme = ref('dark')

const selectCustomCoin = () => {
    if (customCoin.value.trim()) {
        selectedCoin.value = customCoin.value.toUpperCase()
    }
}

const handleOptionClick = (option) => {
    if (option === 'Related News') {
        showRelatedNews.value = true
    }
}

const closePopup = () => {
    showRelatedNews.value = false
}

const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = prefersDark ? 'dark' : 'light'
    updateBodyBackground()
})

const modalBackground = computed(() => {
    return theme.value === 'dark'
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.7)'
})

const updateBodyBackground = () => {
    if (theme.value === 'dark') {
        document.body.style.backgroundColor = '#0d1117'
        document.documentElement.style.backgroundColor = '#0d1117'
    } else {
        document.body.style.backgroundColor = '#f3f4f6'
        document.documentElement.style.backgroundColor = '#f3f4f6'
    }
}

watch(theme, updateBodyBackground)

watch(customCoin, (val) => {
    if (val) selectedCoin.value = ''
})
watch(selectedCoin, (val) => {
    if (val) customCoin.value = ''
})

const coinOptions = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Binance', symbol: 'BNB' },
    { name: 'Solana', symbol: 'SOL' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'XRP', symbol: 'XRP' },
]

const options = [
    'Related News',
    'Analyze',
    'Whitepaper',
    'Whale Activity',
    'Tokenomics'
]

const coinImagePath = computed(() => {
    return coinImageMap[selectedCoin.value] || ''
})

const goToOptions = () => {
    if (selectedCoin.value || customCoin.value.trim()) {
        selectedCoin.value = selectedCoin.value || customCoin.value.toUpperCase()
        step.value = 2
    } else {
        alert('Please select or enter a coin first.')
    }
}

const backToSelect = () => {
    step.value = 1
}
</script>

<template>
    <div :class="['app', theme]">
        <button class="theme-toggle" @click="toggleTheme">
            {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </button>

        <div class="modal" :style="{ backgroundColor: modalBackground }">
            <!-- Step 1: Select coin -->
            <div v-if="step === 1" class="coin-selector">
                <h2 class="modal-title">Select a Coin</h2>

                <!-- Existing select -->
                <select v-model="selectedCoin" class="coin-select">
                    <option value="" disabled>Select a coin</option>
                    <option v-for="coin in coinOptions" :key="coin.symbol" :value="coin.symbol">
                        {{ coin.symbol }}
                    </option>
                </select>

                <!-- New input for custom coin -->
                <input v-model="customCoin" class="coin-select custom" type="text" placeholder="Other Symbol"
                    @keydown.enter.prevent="selectCustomCoin" />

                <button class="continue-button" @click="goToOptions">Continue</button>
            </div>

            <!-- Step 2: Show coin and options -->
            <div v-else-if="step === 2" class="options-container">
                <div class="coin-header">
                    <img v-if="coinImagePath" :src="coinImagePath" :alt="selectedCoin" class="coin-image" />

                    <h2 class="coin-name">{{ selectedCoin }}</h2>
                </div>
                <ul class="option-list">
                    <li v-for="option in options" :key="option" class="option-item">
                        <button class="option-button" @click="handleOptionClick(option)">
                            {{ option }}
                        </button>
                    </li>
                </ul>
                <button class="back-button" @click="backToSelect">Back</button>
            </div>
        </div>
    </div>
    <RelatedNews v-if="showRelatedNews" :coin="selectedCoin" @close="closePopup" />
</template>

<style scoped>
html,
body,
.app {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app.dark {
    background-color: #0d1117;
    color: #fff;
}

.app.light {
    background-color: #f3f4f6;
    color: #111827;
}

.theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    color: inherit;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    border-radius: 20px;
    padding: 2rem;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    min-height: 200px;
}

/* Step 1 coin selector */
.coin-selector {
    width: 100%;
    text-align: center;
}

.coin-select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    background-color: inherit;
    color: #968f8f;
    outline: none;
}

.custom {
    width: 330px;
}

.continue-button {
    padding: 0.6rem 1.2rem;
    background-color: #eb8b25;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-top: 5%;
}

.continue-button:hover {
    background-color: #1d4ed8;
}

/* Step 2 options */
.options-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.coin-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.coin-image {
    width: 40px;
    height: 40px;
}

.coin-name {
    font-size: 1.5rem;
    font-weight: 600;
}

.option-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.option-button {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: #eb6a25;
    color: white;
    transition: background-color 0.3s;
    width: 100%;
}

.option-button:hover {
    background-color: #1dd89a;
}

.back-button {
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: 1px solid currentColor;
    border-radius: 8px;
    color: inherit;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.back-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 480px) {
    .modal {
        width: 90%;
        padding: 1.5rem;
    }

    .coin-name {
        font-size: 1.2rem;
    }

    .coin-image {
        width: 32px;
        height: 32px;
    }
}
</style>

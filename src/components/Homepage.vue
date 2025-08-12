<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap'
import RelatedNews from '@/views/RelatedNews.vue'

const showRelatedNews = ref(false)
const showRelatedNewsFilters = ref(false)

const customCoin = ref('')
const selectedCoin = ref('')
const step = ref(1)
const theme = ref('dark')

const selectedFilter = ref('')
const selectedKind = ref('all')

const relatedNewsFilters = [
    'rising', 'hot', 'bullish', 'bearish', 'important', 'saved', 'lol'
]

const relatedNewsKinds = ['news', 'media', 'all']

const selectCustomCoin = () => {
    if (customCoin.value.trim()) {
        selectedCoin.value = customCoin.value.toUpperCase()
    }
}

const handleOptionClick = (option) => {
    if (option === 'Related News') {
        showRelatedNewsFilters.value = true
    } else {
        showRelatedNews.value = false
        showRelatedNewsFilters.value = false
    }
}

const confirmRelatedNews = () => {
    showRelatedNewsFilters.value = false
    showRelatedNews.value = true
}

const cancelRelatedNewsFilters = () => {
    showRelatedNewsFilters.value = false
}

const closePopup = () => {
    showRelatedNews.value = false
    selectedFilter.value = ''
    selectedKind.value = 'all'
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

const overlayBackground = computed(() => {
    return theme.value === 'dark'
        ? 'rgba(0, 0, 0, 0.7)'
        : 'rgba(0, 0, 0, 0.4)'
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

const hoverIndex = ref(null)

const descriptions = {
    'Related News': 'Latest news and updates about the coin.',
    'Analyze': 'Price, market cap, volume, volatility, and blockchain info.',
    'Whitepaper': 'Official document explaining the project’s technology and purpose.',
    'Whale Activity': 'Tracking large transactions by big holders.',
    'Tokenomics': 'Supply, distribution, and token utility details.',
}

const mobileDescOpenIndex = ref(null)

const toggleMobileDescription = (index) => {
    mobileDescOpenIndex.value = mobileDescOpenIndex.value === index ? null : index
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

                <select v-model="selectedCoin" class="coin-select">
                    <option value="" disabled>Select a coin</option>
                    <option v-for="coin in coinOptions" :key="coin.symbol" :value="coin.symbol">
                        {{ coin.symbol }}
                    </option>
                </select>

                <input v-model="customCoin" class="coin-select custom" type="text" placeholder="Other Symbol"
                    @keydown.enter.prevent="selectCustomCoin" />

                <button class="continue-button" @click="goToOptions">Continue</button>
            </div>

            <!-- Step 2: Show coin and options -->
            <div v-else-if="step === 2" class="step2-wrapper" :aria-hidden="showRelatedNewsFilters ? 'true' : 'false'">
                <div class="options-container" :class="{ 'blurred': showRelatedNewsFilters }">
                    <div class="coin-header">
                        <img v-if="coinImagePath" :src="coinImagePath" :alt="selectedCoin" class="coin-image" />
                        <h2 class="coin-name">{{ selectedCoin }}</h2>
                    </div>
                    <ul class="option-list">
                        <li v-for="(option, index) in options" :key="option" class="option-item"
                            @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = null"
                            style="position: relative;">
                            <button class="option-button" @click="handleOptionClick(option)"
                                :disabled="showRelatedNewsFilters">
                                {{ option }}
                            </button>
                            <div v-if="hoverIndex === index" class="line-to-desc"></div>
                        </li>
                    </ul>

                    <div class="description-container" v-if="hoverIndex !== null && !showRelatedNewsFilters">
                        <div class="description-box" :style="{ top: hoverIndex * 54 + 'px' }">
                            <p>{{ descriptions[options[hoverIndex]] }}</p>
                            <div class="line-from-menu"></div>
                        </div>
                    </div>

                    <button class="back-button" @click="backToSelect" :disabled="showRelatedNewsFilters">Back</button>
                </div>
            </div>
        </div>

        <!-- Overlay popup for Related News filter/kind -->
        <div v-if="showRelatedNewsFilters" class="overlay">
            <div class="overlay-content" role="dialog" aria-modal="true" aria-labelledby="overlayTitle">
                <h3 id="overlayTitle" style="color: ;">Select Filters for Related News</h3>

                <label>
                    Filter (optional):
                    <select v-model="selectedFilter" style=" text-align: center;">
                        <option value="">-- No Filter --</option>
                        <option v-for="filter in relatedNewsFilters" :key="filter" :value="filter">
                            {{ filter }}
                        </option>
                    </select>
                </label>

                <label>
                    Kind (optional):
                    <select v-model="selectedKind" style=" text-align: center;">
                        <option v-for="kind in relatedNewsKinds" :key="kind" :value="kind">
                            {{ kind }}
                        </option>
                    </select>
                </label>

                <div class="filter-buttons">
                    <button @click="cancelRelatedNewsFilters">Cancel</button>
                    <button @click="confirmRelatedNews">Continue</button>
                </div>
            </div>
        </div>

        <RelatedNews v-if="showRelatedNews" :coin="selectedCoin" :filter="selectedFilter" :kind="selectedKind"
            @close="closePopup" />
    </div>
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

/* Blur background when overlay open */
.blurred {
    filter: blur(4px);
    pointer-events: none;
    user-select: none;
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

.step2-wrapper {
    position: relative;
    width: 100%;
    max-width: 420px;
    min-height: 320px;
    box-sizing: border-box;
}

.options-container {
    width: 100%;
    position: relative;
    z-index: 2;
}

.option-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.option-item {
    margin-bottom: 0;
    position: relative;
}

/* Connecting line from menu button to description box */
.line-to-desc {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 30px;
    height: 2px;
    background-color: #eb8b25;
    border-radius: 2px;
    transform: translateY(-50%);
    pointer-events: none;
}

/* Tooltip container positioned outside to right of menu */
.description-container {
    position: absolute;
    top: 80px;
    left: 110%;
    width: 450px;
    pointer-events: none;
    user-select: none;
}

/* Tooltip description box */
.description-box {
    position: absolute;
    background: rgba(235, 139, 37, 0.1);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    color: inherit;
    font-size: 0.95rem;
    line-height: 1.3;
    width: 100%;
    box-sizing: border-box;
    white-space: normal;
    box-shadow: 0 0 8px rgba(235, 139, 37, 0.4);
}

/* Connecting line from description back to menu */
.line-from-menu {
    position: absolute;
    left: -30px;
    top: 50%;
    width: 50px;
    height: 2px;
    border-radius: 2px;
    transform: translateY(-50%);
    pointer-events: none;
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

.back-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* Overlay popup */

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--overlay-bg, rgba(0, 0, 0, 0.7));
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.overlay-content {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    box-sizing: border-box;
    color: #222;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.overlay-content h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #eb8b25;
}

.overlay-content label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    font-weight: 600;
}

.overlay-content select {
    margin-top: 0.3rem;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
}

.filter-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.filter-buttons button {
    background-color: #eb8b25;
    border: none;
    padding: 0.6rem 1.2rem;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.filter-buttons button:hover {
    background-color: #1d4ed8;
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

    .overlay-content {
        width: 95%;
        padding: 1.5rem;
    }
}
</style>

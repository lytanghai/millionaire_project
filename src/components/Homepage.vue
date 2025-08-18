<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { coinImageMap } from '@/assets/data/coinImageMap'
import RelatedNews from '@/views/RelatedNews.vue'
import Analyze from '@/views/Analyze.vue'
import { useRouter } from 'vue-router'

// Test only
const router = useRouter()

const showRelatedNews = ref(false)
const showRelatedNewsFilters = ref(false)
const showAnalyzePopup = ref(false)

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
        showAnalyzePopup.value = false
        showRelatedNews.value = false
        return
    }

    if (option === 'Analyze') {
        // Ensure a coin is selected
        const coinParam = customCoin.value.trim()
            ? customCoin.value.toUpperCase()
            : selectedCoin.value
        if (!coinParam) {
            alert('Please select or enter a coin first.')
            return
        }
        showAnalyzePopup.value = true
        showRelatedNewsFilters.value = false
        showRelatedNews.value = false
        selectedCoin.value = coinParam
        return
    }

    showRelatedNews.value = false
    showRelatedNewsFilters.value = false
    showAnalyzePopup.value = false
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
    if (val && selectedCoin.value !== 'other') {
        selectedCoin.value = ''
    }
})

watch(selectedCoin, (val) => {
    if (val && val !== 'other') {
        customCoin.value = ''
    }
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
    if (selectedCoin.value === 'other' && customCoin.value.trim()) {
        selectedCoin.value = customCoin.value.toUpperCase()
    }

    if (selectedCoin.value) {
        step.value = 2
        router.push('/')
    } else {
        alert('Please select or enter a coin first.')
    }
}

const backToSelect = () => {
    step.value = 1
}

const hoverIndex = ref(null)

// Trading sessions with approximate volume ranking (high to low)
const tradingSessions = [
    { name: 'Tokyo', startUTC: 0, endUTC: 8, time: '00:00 - 08:00 GMT', volume: 'Medium' },
    { name: 'London', startUTC: 8, endUTC: 16, time: '08:00 - 16:00 GMT', volume: 'High' },
    { name: 'New York', startUTC: 13, endUTC: 21, time: '13:00 - 21:00 GMT', volume: 'High' },
]

const currentGMT7 = ref('') // store current GMT+7 string
const formatGMT7 = () => {
    const now = new Date()
    const gmt7 = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return gmt7
}

const updateActiveSession = () => {
    const now = formatGMT7()
    const hour = now.getHours() // local hour in GMT+7
    // Sessions in GMT+7
    if (hour >= 7 && hour < 15) {
        activeSession.value = 'Tokyo'
    } else if (hour >= 15 && hour < 23) {
        activeSession.value = 'London'
    } else {
        activeSession.value = 'New York'
    }
    currentGMT7.value = now.toISOString().replace('T', ' ').slice(0, 19)
}

const activeSession = ref('')

const goToGeneralDashboard = () => {
    router.push('/general'); // assuming you have a route for General
};

// Start interval
onMounted(() => {
    updateActiveSession()
    setInterval(() => {
        updateActiveSession()
    }, 1000)
})

</script>

<template>
    <div :class="['app', theme]">
        <button class="next-button" @click="goToGeneralDashboard">Forex News Impact</button>
        <div class="modal" :style="{ backgroundColor: modalBackground }">
            <!-- Step 1: Select coin -->
            <div v-if="step === 1" class="coin-selector">
                <h2 class="modal-title">Select a Coin</h2>

                <select v-model="selectedCoin" class="coin-select" style="text-align: center;">
                    <option value="" disabled>Select a coin</option>
                    <option v-for="coin in coinOptions" :key="coin.symbol" :value="coin.symbol">
                        {{ coin.symbol }}
                    </option>
                    <option value="other">Other</option> <!-- Add 'Other' option -->
                </select>

                <!-- Show input only if 'Other' selected -->
                <input v-if="selectedCoin === 'other'" v-model="customCoin" style="text-align: center;"
                    class="coin-select custom" type="text" placeholder="Enter custom symbol"
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
                            <button class="option-button" @click.stop="() => handleOptionClick(option)">
                                {{ option }}
                            </button>
                        </li>
                    </ul>
                    <button class="back-button" @click="backToSelect" :disabled="showRelatedNewsFilters">Back</button>
                </div>
            </div>
        </div>

        <!-- Overlay popup for Related News filter/kind -->
        <div v-if="showRelatedNewsFilters" class="overlay">
            <div class="overlay-content" role="dialog" aria-modal="true" aria-labelledby="overlayTitle">
                <h3 id="overlayTitle" style="color:#000 ;">Select Filters for Related News</h3>

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
        <Analyze v-if="showAnalyzePopup" :coin="selectedCoin" />

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
    color: inherit;
}

.app.dark {
    background-color: #0d1117;
    color: #fff;
}

.app.light {
    background-color: #f3f4f6;
    color: #111827;
}

.next-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: #1a5541;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1000;
}

.next-button:hover {
    background-color: #13b47a;
}

.theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: none;
    color: inherit;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;
    z-index: 1100;
}

.theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    width: 90%;
    max-width: 420px;
    max-height: 90vh;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    overflow-y: auto;
}

.blurred {
    filter: blur(5px);
    pointer-events: none;
    user-select: none;
    transition: filter 0.3s ease;
}

.coin-selector {
    width: 100%;
    text-align: center;
}

.coin-select,
.custom {
    width: 100%;
    padding: 0.6rem 0.75rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    background-color: inherit;
    color: inherit;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s;
    background-color: #333;
}

.coin-select:focus,
.custom:focus {
    border-color: #eb8b25;
}

.custom {
    max-width: 330px;
    margin-left: auto;
    margin-right: auto;
}

.continue-button {
    width: 100%;
    max-width: 330px;
    padding: 0.7rem 1.5rem;
    background-color: #eb8b25;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
    user-select: none;
}

.continue-button:hover,
.continue-button:focus {
    background-color: #1d4ed8;
    outline: none;
}

/* Step 2 - Options */
.step2-wrapper {
    width: 100%;
    max-width: 420px;
    min-height: 320px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.options-container {
    width: 100%;
    position: relative;
    z-index: 2;
}

.coin-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.coin-image {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: contain;
    background: rgba(255, 255, 255, 0.1);
}

.coin-name {
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
}

.option-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.option-item {
    position: relative;
}

/* Option Button */
.option-button {
    width: 100%;
    text-align: left;
    padding: 0.85rem 1.2rem;
    font-size: 1.05rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #eb6a25;
    color: white;
    transition: background-color 0.3s ease;
    user-select: none;
    box-shadow: 0 2px 6px rgb(235 138 37 / 0.3);
}

.option-button:hover:not(:disabled),
.option-button:focus:not(:disabled) {
    background-color: #1dd89a;
    outline: none;
}

.option-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #a06e00;
    box-shadow: none;
}

/* Back Button */
.back-button {
    padding: 0.6rem 1.2rem;
    background-color: transparent;
    border: 1.5px solid currentColor;
    border-radius: 10px;
    color: inherit;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
    width: 100%;
    max-width: 160px;
    margin: 0 auto;
    display: block;
    user-select: none;
}

.back-button:hover:not(:disabled),
.back-button:focus:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
    outline: none;
}

.back-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* Overlay popup */
.overlay {
    position: fixed;
    inset: 0;
    background-color: var(--overlay-bg, rgba(0, 0, 0, 0.7));
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    padding: 1rem;
    box-sizing: border-box;
}

.overlay-content {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
    color: #222;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.35);
    max-height: 90vh;
    overflow-y: auto;
}

.overlay-content h3 {
    margin-top: 0;
    margin-bottom: 1.25rem;
    color: #eb8b25;
    font-weight: 700;
    font-size: 1.4rem;
}

.overlay-content label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: #333;
}

.overlay-content select {
    margin-top: 0.4rem;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: 1.5px solid #ccc;
    font-size: 1.05rem;
    user-select: none;
    cursor: pointer;
}

.filter-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.7rem;
    margin-top: 1.25rem;
}

.filter-buttons button {
    padding: 0.65rem 1.25rem;
    font-size: 1.05rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    transition: background-color 0.25s ease;
    user-select: none;
    color: white;
}

.filter-buttons button:first-child {
    background-color: #ef4444;
}

.filter-buttons button:first-child:hover {
    background-color: #b91c1c;
}

.filter-buttons button:last-child {
    background-color: #22c55e;
}

.filter-buttons button:last-child:hover {
    background-color: #15803d;
}

/* Scrollbar for modal and overlay content */
.modal::-webkit-scrollbar,
.overlay-content::-webkit-scrollbar,
.step2-wrapper::-webkit-scrollbar {
    width: 10px;
}

.modal::-webkit-scrollbar-thumb,
.overlay-content::-webkit-scrollbar-thumb,
.step2-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(235, 139, 37, 0.6);
    border-radius: 10px;
}

.modal::-webkit-scrollbar-track,
.overlay-content::-webkit-scrollbar-track,
.step2-wrapper::-webkit-scrollbar-track {
    background-color: transparent;
}

/* Responsive tweaks */
@media (max-width: 440px) {
    .description-container {
        display: none;
    }

    .modal {
        padding: 1rem 1.25rem;
    }

    .overlay-content {
        padding: 1rem 1.25rem;
    }
}
</style>

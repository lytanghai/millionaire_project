<template>
  <section class="parent analyze-section" :class="{ 'fade-out': isExiting }">
    <!-- Loader -->
    <div v-if="showLoader" class="loader-banner">
      <h1>Analyzing<span class="dots"><span>.</span><span>.</span><span>.</span></span></h1>
      <div class="particles">
        <span class="particle" v-for="n in 8" :key="n"></span>
      </div>
    </div>

    <!-- Cards + button -->
    <template v-else>
      <div class="div1 card" :style="getCardStyle(0)">
        <h2>General Information</h2>
        <p><strong>Name:</strong> {{ general.name }}</p>
        <p><strong>Symbol:</strong> {{ general.symbol }}</p>
        <p><strong>Global Rank:</strong> {{ general.rank }}</p>
        <p><strong>Currently Active:</strong> {{ general.currentlyAction }}</p>
        <p><strong>New Coin:</strong> {{ general.isNew }}</p>
        <p><strong>Exchange Type:</strong> {{ general.exchangeType }}</p>
        <p><strong>Network / Blockchain:</strong> {{ general.network || 'N/A' }}</p>
        <p><strong>Type:</strong> {{ general.type }}</p>
        <p><strong>Platform:</strong> {{ general.type }}</p>
        <p><strong>Started at:</strong> xxxxxxxxxx</p>
        <p><strong>Organzation Structure:</strong> {{ general.type }}</p>
        <p><strong>Description:</strong> {{ general.type }}</p>
        <!-- Image Logo -->
      </div>

      <div class="div2 card" :style="getCardStyle(1)">
        <h2>Market Information</h2>
        <p><strong>Current Price:</strong> ${{ market.currentPrice }}</p>
        <p><strong>All Time High:</strong> ${{ market.ath }}</p>
        <p><strong>All Time Low:</strong> ${{ market.atl }}</p>
        <p><strong>Market Cap:</strong> {{ market.marketCap }}</p>
        <p><strong>Volume:</strong> {{ market.volume }}</p>
        <p>
          <strong>Last 24h:</strong> Trades: {{ market.trades }}, Low: ${{ market.low24h }}, High: ${{ market.high24h }}
        </p>
        <p><strong>Volatility:</strong> {{ volatilityPercent.toFixed(2) }}%</p>
      </div>

      <div class="div3 card" :style="getCardStyle(2)">
        <h2>Development, Community & Risks</h2>
        <section>
          <h3>Development & Community</h3>
          <ul>
            <li>Developer Activity: {{ devCommunity.developerActivity }}</li>
            <li>Team: {{ devCommunity.team }}</li>
            <li>Community Size: {{ devCommunity.communitySize }}</li>
            <li>Partnerships: {{ devCommunity.partnerships }}</li>
          </ul>
        </section>
        <section>
          <h3>Risk Factors</h3>
          <ul>
            <li>Regulation: {{ risks.regulation }}</li>
            <li>Concentration: {{ risks.concentration }}</li>
            <li>Security History: {{ risks.securityHistory }}</li>
            <li>Liquidity Risk: {{ risks.liquidityRisk }}</li>
          </ul>
        </section>

      </div>

      <div class="div4 card" :style="getCardStyle(3)">
        <h2>Crypto Exchanges</h2>
        <!-- GET https://api.coinpaprika.com/v1/coins/{coin_id}/markets -->
        <section>
          <h3>Exchanges</h3>
          <table class="exchange-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Trust</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Binance</td>
                <td>934,343,232</td>
                <td>10/10</td>
              </tr>
              <tr>
                <td>Bitget</td>
                <td>234,123,321</td>
                <td>8/10</td>
              </tr>
              <tr>
                <td>Gate</td>
                <td>120,999,111</td>
                <td>7/10</td>
              </tr>
              <tr>
                <td>KuCoin</td>
                <td>89,876,543</td>
                <td>7.5/10</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <button class="continue-btn" :style="getCardStyle(3)" @click="handleContinue" :disabled="isExiting">
        Exit
      </button>
    </template>
  </section>
</template>


<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const coin = route.query.coin || ''

function revealCardsSequentially() {
  const totalItems = 4; // 3 cards + 1 button
  let current = 0;
  const interval = setInterval(() => {
    visibleIndex.value = current;
    current++;
    if (current >= totalItems) clearInterval(interval);
  }, 400); // each 400ms
}

function getCardStyle(index) {
  const isVisible = visibleIndex.value >= index;
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  };
}

const general = reactive({
  name:'Bitcoin',
  symbol: 'USDT',
  rank: 3,
  currentlyAction: 'YES',
  isNew:'NO',
  exchangeType: 'Crypto',
  network: 'Ethereum, Tron, BSC',
  type: 'Token',
})

const market = reactive({
  currentPrice: 1.0,
  ath: 1.32,
  atl: 0.85,
  marketCap: '70B',
  volume: '20B',
  trades: 20000,
  low24h: 0.98,
  high24h: 1.02,
  previousClose: 1.01,
  dayHigh: 1.02,
  dayLow: 0.98,
})

const volatilityPercent = computed(() => {
  const { dayHigh, dayLow, previousClose } = market
  if (previousClose === 0) return 0
  return ((dayHigh - dayLow) / previousClose) * 100
})

const devCommunity = reactive({
  developerActivity: 'Active on GitHub, 500+ commits last month',
  team: 'Experienced blockchain engineers and advisors',
  communitySize: '500k Telegram, 200k Twitter followers',
  partnerships: 'Binance, Coinbase, Chainlink',
})

const risks = reactive({
  regulation: 'Low risk but under monitoring',
  concentration: 'Top 10 wallets hold 60%',
  securityHistory: 'No major hacks reported',
  liquidityRisk: 'High liquidity, low risk',
})

// Control showing loader and cards
const showLoader = ref(true)
const visibleIndex = ref(-1) // -1 means none visible yet
const isExiting = ref(false)

onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
    revealCardsSequentially()
  }, 2500) // Show loader for 2.5 seconds
})

const handleContinue = () => {
  if (isExiting.value) return
  isExiting.value = true
  setTimeout(() => {
    router.push('/')
    window.location.reload()
  }, 2000)
}
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  position: relative;
  overflow-x: hidden;
  transition: opacity 1.5s ease;
}

.fade-out {
  opacity: 0;
}

/* Gradient animation */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 50% 50%;
  }

  75% {
    background-position: 75% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* Loader Banner */
.loader-banner {
  grid-column: 1 / -1;
  padding: 0;
  color: #f1f5f9;
  user-select: none;
  position: relative;
  overflow: visible;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
}


.loader-banner h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  display: inline-block;
  letter-spacing: 0.04em;
}

.dots span {
  animation-name: blink;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  opacity: 0;
  margin-left: 3px;
}

.dots span:nth-child(1) {
  animation-delay: 0s;
}

.dots span:nth-child(2) {
  animation-delay: 0.3s;
}

.dots span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

/* Particles animation */

.particles {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 10px;
  position: relative;
  height: 20px;
}

.particle {
  width: 12px;
  height: 12px;
  background: #38bdf8;
  border-radius: 50%;
  opacity: 0.6;
  animation-name: particleFloat;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.particle:nth-child(odd) {
  animation-delay: 0s;
}

.particle:nth-child(even) {
  animation-delay: 1s;
}

@keyframes particleFloat {
  0% {
    transform: translateY(0);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-12px);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
}

/* Card styling */
.card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

/* Headings & text */
h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 1.25rem;
  color: #ffffff;
}

h3 {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #f1f5f9;
}

p {
  margin: 6px 0;
  color: #cbd5e1;
  font-size: 0.95rem;
}

strong {
  color: #ffffff;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

li::before {
  content: "•";
  color: #38bdf8;
  margin-right: 8px;
  font-size: 1.2rem;
}

.exchange-table {
  width: 100%;
  border-collapse: collapse;
  color: #cbd5e1;
  font-size: 0.95rem;
  margin-top: 8px;
}

.exchange-table th,
.exchange-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.exchange-table th {
  color: #38bdf8;
  font-weight: 600;
}

.exchange-table tr:hover {
  background: rgba(56, 189, 248, 0.1);
}

/* Continue button styling */
.continue-btn {
  grid-column: 1 / -1;
  background: linear-gradient(90deg, #f88238, #3b82f6);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.6s ease;
}

.continue-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

/* Mobile tweaks */
@media (max-width: 640px) {
  .parent {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 14px;
    height: 100px;
  }

  .card {
    padding: 16px;
  }

  h2 {
    font-size: 1.1rem;
  }

  h3 {
    font-size: 0.95rem;
  }

  .loader-banner h1 {
    font-size: 1.8rem;
  }
}
</style>

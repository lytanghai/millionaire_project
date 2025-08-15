<style scoped>
.slideshow-container {
  position: relative;
  width: 98vw;
  height: 98vh;
  max-width: 1100px;
  max-height: 1000px;
  margin: auto;
  padding: 32px;
  background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  color: #cbd5e1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  box-sizing: border-box;
  overflow: hidden;
}

.fade-out {
  opacity: 0;
  transition: opacity 1.5s ease;
}

.card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  text-align: left;
  scrollbar-width: thin;
  scrollbar-color: #38bdf8 transparent;
}

.card::-webkit-scrollbar {
  width: 8px;
}

.card::-webkit-scrollbar-thumb {
  background-color: #38bdf8;
  border-radius: 4px;
}

.market-info {
  display: flex;
  gap: 2rem;
}

.market-col {
  flex: 1;
}

/* Headings */
h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
}

h3 {
  margin-bottom: 10px;
  color: #f1f5f9;
  font-weight: 600;
}

p,
li {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #cbd5e1;
}

ul {
  list-style: none;
  padding-left: 0;
}

ul li::before {
  content: "•";
  color: #38bdf8;
  margin-right: 8px;
  font-size: 1.2rem;
}

.coin-logo-wrapper {
  display: flex;
  justify-content: center;
  /* center horizontally */
  align-items: center;
  /* center vertically if needed */
  margin-bottom: 1rem;
  background-color: white;
  padding: 0.3rem;
  border-radius: 50%;
  width: 60px;
  /* smaller size */
  height: 60px;
  /* smaller size */
  margin-left: auto;
  margin-right: auto;
}

.coin-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}


.fire-brush-bg {
  display: inline-block;
  padding: 0 12px;
  font-weight: 700;
  color: white;
  background: linear-gradient(45deg, rgb(65, 176, 111), #7da871, #ffd700);
  clip-path: polygon(5% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 5% 100%, 0% 80%, 0% 20%);
  -webkit-clip-path: polygon(5% 0%, 95% 0%, 100% 20%, 100% 80%, 95% 100%, 5% 100%, 0% 80%, 0% 20%);
  box-shadow: 0 0 10px 2px rgba(255, 69, 0, 0.7);
  user-select: none;
}

.exchange-table {
  width: 100%;
  border-collapse: collapse;
  color: #cbd5e1;
}

.exchange-table th,
.exchange-table td {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  text-align: left;
}

.exchange-table th {
  color: #38bdf8;
  font-weight: 600;
}

.exchange-table tr:hover {
  background: rgba(56, 189, 248, 0.1);
}

.nav-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  padding-top: 20px;
  box-sizing: border-box;
}

.nav-buttons button {
  background: #3b82f6;
  color: white;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: background-color 0.25s ease;
  font-size: 1.15rem;
  user-select: none;
}

.nav-buttons button:disabled {
  background: rgba(59, 130, 246, 0.5);
  cursor: not-allowed;
}

.nav-buttons button:not(:disabled):hover {
  background: #2563eb;
}

/* Exit button styling */
.exit-btn {
  background: #ef4444;
  color: white;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  user-select: none;
  transition: background-color 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.exit-btn:hover {
  background: #b91c1c;
}

/* Loader styling */
.loader-banner {
  color: #f1f5f9;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
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

/* Responsive tweaks */
@media (max-width: 640px) {
  .slideshow-container {
    margin-top: 10%;
    width: 98vw;
    height: 90vh;
    padding: 20px;
  }

  .card {
    padding: 20px;
  }

  .nav-buttons button {
    padding: 14px 24px;
    font-size: 1rem;
  }

  .exit-btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .market-info {
    flex-direction: column;
  }
}
</style>

<template>
  <section class="slideshow-container" :class="{ 'fade-out': isExiting }">
    <!-- Loader -->
    <div v-if="showLoader" class="loader-banner">
      <h1>Analyzing<span class="dots"><span>.</span><span>.</span><span>.</span></span></h1>
      <div class="particles">
        <span class="particle" v-for="n in 8" :key="n"></span>
      </div>
    </div>

    <!-- Slideshow Cards -->
    <template v-else>
      <!-- Slide content -->
      <div class="card">
        <template v-if="currentSlide === 0">
          <h2>General Information</h2>
          <!-- Coin Logo -->
          <div v-if="apiData.logo" class="coin-logo-wrapper">
            <img :src="apiData.logo" :alt="apiData.symbol_name || 'Coin Logo'" class="coin-logo" />
          </div>

          <p><strong>Name:</strong> {{ apiData.symbol_name || '*Information Unavailable' }}</p>
          <p><strong>Symbol:</strong> {{ apiData.symbol || '*Information Unavailable' }}</p>
          <p><strong>Rank:</strong> <span class="fire-brush-bg">{{ apiData.rank || '*Information Unavailable' }}</span></p>
          <p><strong>Layer:</strong> {{ apiData.id || '*Information Unavailable' }} | {{ apiData.name || '*Information Unavailable' }} </p>
          <p><strong>Currently Active:</strong> {{ apiData.is_active ? 'Yes' : 'No' }}</p>
          <p><strong>New Coin:</strong> {{ apiData.is_new ? 'Yes' : 'No' }}</p>
          <p><strong>Type:</strong> {{ apiData.type || '*Information Unavailable' }}</p>
          <p><strong>Open Source:</strong> {{ apiData.open_source === true ? 'YES' : 'NO' || '*Information Unavailable' }}</p>
          <p><strong>Listed Date:</strong> {{ apiData.started_at || '*Information Unavailable' }}</p>
          <p><strong>Organization Structure:</strong> {{ apiData.org_structure || '*Information Unavailable' }}</p>
          <p><strong>Hash Algorithm:</strong> {{ apiData.hash_algorithm || '*Information Unavailable' }}</p>
          <p><strong>Description:</strong></p>
          <div v-html="apiData.coin_description || '---'"></div>
        </template>

        <template v-else-if="currentSlide === 1">
          <h2>Development, Community & Risks</h2>
          <section>
            <h3>Development & Community</h3>
            <ul>
              <section v-if="apiData.team && apiData.team.length">
                <h3>Team Members</h3>
                <ul>
                  <li v-for="member in apiData.team" :key="member.id">
                    {{ member.name }} — {{ member.position }}
                  </li>
                </ul>
              </section>
            </ul>
          </section>
          <section>
            <h3>Risk Factors</h3>
            <p><strong>Whitepaper:</strong></p>
            <ul>
              <li v-for="(url, name) in apiData.whitepaper" :key="'whitepaper-' + name">
                <a style="text-decoration: none; color: #fafafa;" :href="url" target="_blank">{{ name }}</a>
              </li>
            </ul>
            <h4>Explorer</h4>
            <ul>
              <li v-for="(url, name) in apiData.explorer" :key="'explorer-' + name">
                <a style="text-decoration: none; color: #fafafa;" :href="url" target="_blank">{{ name }}</a>
              </li>
            </ul>

            <h4>Links</h4>
            <ul>
              <li v-for="(url, name) in apiData.link_extended" :key="'link-' + name">
                <a style="text-decoration: none; color: #fafafa;" :href="url" target="_blank">{{ name }}</a>
              </li>
            </ul>
          </section>

        </template>

        <template v-else-if="currentSlide === 2">
          <h2>Market Information</h2>
          <div class="market-info">
            <div class="market-col">
              <!-- <p><strong>Current Price:</strong> {{ cgData.current_price || '*Information Unavailable' }} --- </p>
              <p><strong>All Time High Date:</strong> {{ cgData.ath_date || '*Information Unavailable' }} </p>
              <p><strong>All Time High:</strong> {{ cgData.ath_price || '*Information Unavailable' }}</p>
              <p><strong>All Time Low Date:</strong> {{ cgData.atl_date || '*Information Unavailable' }} </p>
              <p><strong>All Time Low:</strong> {{ cgData.atl_price || '*Information Unavailable' }} </p>
              <p><strong>Low 24h:</strong> --- </p>
              <p><strong>High 24h:</strong> --- </p>
              <p><strong>Fully Diluted Valuation:</strong> {{cgData.fully_diluted_valuation || '*Information Unavailable' }} </p>
              <p><strong>Total Supply:</strong> {{cgData.total_supply || '*Information Unavailable' }} </p>
              <p><strong>Circulating Supply:</strong> {{cgData.circulating_supply || '*Information Unavailable' }} </p>
              <p><strong>Max Supply:</strong> {{cgData.max_supply || '*Information Unavailable' }} </p>
              <p><strong>Market Cap FDV R atio:</strong> {{cgData.market_cap_fdv_ratio || '*Information Unavailable' }} </p>
              <p><strong>Supply Infinite:</strong> {{cgData.max_supply_infinite || '*Information Unavailable' }} </p> -->
            </div>
            <div class="market-col">
              <p><strong>Market Cap:</strong>{{ohclData.market_cap || '*Information Unavailable' }} </p>
              <p><strong>Volume:</strong>{{ohclData.volume || '*Information Unavailable' }} </p>
              <h3>Today</h3>
              <p><strong>Opened Time:</strong> {{ohclData.time_open || '*Information Unavailable' }} </p>
              <p><strong>Opened At:</strong> {{ohclData.open || '*Information Unavailable' }} </p>
              <p><strong>Lowest At:</strong> {{ohclData.low || '*Information Unavailable' }} </p>
              <p><strong>Closed Time:</strong> {{ohclData.close || '*Information Unavailable' }} </p>
              <p><strong>Closed At:</strong>{{ohclData.time_close || '*Information Unavailable' }} </p>
              <p><strong>Highest At:</strong> {{ohclData.high || '*Information Unavailable' }} </p>
              <p><strong>Volatility:</strong> {{ volatilityPercent || '*Information Unavailable' }} </p>
            </div>
          </div>
        </template>


        <template v-else-if="currentSlide === 3">
          <h2>Crypto Exchanges</h2>
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
                <td>---</td>
                <td>---</td>
              </tr>
              <tr>
                <td>Bitget</td>
                <td>---</td>
                <td>---</td>
              </tr>
              <tr>
                <td>Gate</td>
                <td>---</td>
                <td>---</td>
              </tr>
              <tr>
                <td>KuCoin</td>
                <td>---</td>
                <td>---</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>

      <!-- Navigation Buttons -->
      <div class="nav-buttons">
        <button @click="prevSlide" :disabled="currentSlide === 0">Previous</button>

        <template v-if="currentSlide !== maxSlide">
          <button @click="nextSlide" :disabled="currentSlide === maxSlide">Next</button>
        </template>

        <template v-else>
          <button class="exit-btn" @click="exitToHome">Exit</button>
        </template>
      </div>
    </template>
  </section>
</template>

<script setup>
import { backend_url, calculateIntradayVolatility } from '@/assets/data/common';
import axios from 'axios';
import { onMounted, ref } from 'vue';

// Receive coin as a prop from parent
const props = defineProps({
  coin: {
    type: String,
    required: true
  }
})

const showLoader = ref(true);
const isExiting = ref(false);

const currentSlide = ref(0);
const maxSlide = 3;

const apiData = ref(null);
const ohclData = ref(null);
const errorMsg = ref('');
const volatilityPercent = ref('---');

const jwtToken = localStorage.getItem('token');

function triggerApi(topicOperation, providerName, targetRef) {
  const url = backend_url + '/service/trigger'
  const payload = {
    topic_name: 'analyze',
    provider_name: providerName,
    payload: {
      topic_operation: topicOperation,
      coin: props.coin,
    },
  }
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  }

  showLoader.value = true
  console.log("payload: " + payload)
  axios.post(url, payload, { headers })

    .then(response => {

      if (response.data.status === 'success') {
        targetRef.value = response.data.data.content

        if (topicOperation === 'GET_TODAY_OHLC') {
          const { high, low } = targetRef.value
          if (high && low) {
            const vol = calculateIntradayVolatility(high, low)
            volatilityPercent.value = (vol * 100).toFixed(2) + '%'
          } else {
            volatilityPercent.value = '---'
          }
        }

      } else {
        errorMsg.value = `API returned status: ${response.data.status}`
      }
    })
    .catch(error => {
      errorMsg.value = `Failed to fetch ${topicOperation} data: ${error.message}`
    })
    .finally(() => {
      showLoader.value = false
    })
}

onMounted(() => {
  triggerApi('GET_COIN_DETAIL', 'coin_paprika', apiData);
  triggerApi('GET_TODAY_OHLC', 'coin_paprika', ohclData);
});

function nextSlide() {
  if (currentSlide.value < maxSlide) currentSlide.value++;
}

function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--;
}

function exitToHome() {
  if (isExiting.value) return;
  isExiting.value = true;
  setTimeout(() => {
    window.location.reload();
  }, 100);
}
</script>

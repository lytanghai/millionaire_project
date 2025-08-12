<template>
  <section class="parent analyze-section">
    <!-- Grid 1: General Information -->
    <div class="div1 card">
      <h2>General Information</h2>
      <p><strong>Symbol:</strong> {{ general.symbol }}</p>
      <p><strong>Global Rank:</strong> {{ general.rank }}</p>
      <p><strong>Exchange Type:</strong> {{ general.exchangeType }}</p>
      <p><strong>Network / Blockchain:</strong> {{ general.network || 'N/A' }}</p>
      <p><strong>Type:</strong> {{ general.type }}</p>
    </div>

    <!-- Grid 2: Market Information -->
    <div class="div2 card">
      <h2>Market Information</h2>
      <p><strong>Current Price:</strong> ${{ market.currentPrice }}</p>
      <p><strong>ATH:</strong> ${{ market.ath }}</p>
      <p><strong>ATL:</strong> ${{ market.atl }}</p>
      <p><strong>Market Cap:</strong> ${{ market.marketCap }}</p>
      <p><strong>Volume:</strong> ${{ market.volume }}</p>
      <p>
        <strong>Last 24h:</strong> Trades: {{ market.trades }}, Low: ${{ market.low24h }}, High: ${{ market.high24h }}
      </p>
      <p><strong>Volatility:</strong> {{ volatilityPercent.toFixed(2) }}%</p>
    </div>

    <!-- Grid 3: Development, Community and Risks -->
    <div class="div3 card">
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
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'

// Demo reactive data
const general = reactive({
  symbol: 'USDT',
  rank: 3,
  exchangeType: 'Crypto',
  network: 'Ethereum, Tron, BSC',
  type: 'Token', // or 'Coin'
})

const market = reactive({
  currentPrice: 1.00,
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

// Volatility calculation based on your formula
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
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  padding: 16px;
  background: #f7f7f7;
  border-radius: 8px;
  min-height: 500px;
  font-family: Arial, sans-serif;
}

.div1 {
  grid-row: span 5 / span 5;
  background-color: #e3f2fd;
  padding: 16px;
  border-radius: 8px;
}

.div2 {
  grid-column: span 2 / span 2;
  grid-row: span 5 / span 5;
  background-color: #fff3e0;
  padding: 16px;
  border-radius: 8px;
}

.div3 {
  grid-column: span 2 / span 2;
  grid-row: span 5 / span 5;
  grid-column-start: 4;
  background-color: #f3e5f5;
  padding: 16px;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: 700;
}

h3 {
  margin-top: 12px;
  margin-bottom: 8px;
  font-weight: 600;
}

p {
  margin: 6px 0;
}

ul {
  list-style: disc inside;
  padding-left: 0;
  margin: 0 0 12px 0;
}

li {
  margin-bottom: 6px;
}
</style>

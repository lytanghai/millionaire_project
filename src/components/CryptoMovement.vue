<template>
  <div class="crypto-modal">
    <div class="crypto-content">
      <h2 class="title">Crypto Movement Cheat Sheet</h2>

      <!-- Cards grid -->
      <div class="cards">
        <div
          v-for="movement in movements"
          :key="movement.name"
          class="card"
          :style="{ backgroundColor: movement.bgColor }"
          @click="openDetail(movement)"
        >
          <h3 class="card-title">{{ movement.name }}</h3>
        </div>
      </div>

      <button @click="$emit('close')" class="close-btn">Close</button>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedMovement" class="detail-modal" @click.self="selectedMovement = null">
      <div class="detail-content">
        <h3 class="detail-title">{{ selectedMovement.name }}</h3>
        <p class="detail-description">{{ selectedMovement.description }}</p>

        <div class="chart-section">
          <h4>Chart:</h4>
          <svg viewBox="0 0 100 50" class="chart">
            <polyline
              :points="selectedMovement.points"
              fill="none"
              :stroke="selectedMovement.color"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="detail-section">
          <h4>Cause:</h4>
          <p>{{ selectedMovement.cause }}</p>
        </div>

        <div class="detail-section">
          <h4>Effect:</h4>
          <p>{{ selectedMovement.affect }}</p>
        </div>

        <div class="detail-section">
          <h4>Meme:</h4>
          <p class="meme">{{ selectedMovement.meme }}</p>
        </div>

        <button @click="selectedMovement = null" class="close-btn">Back</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import CryptoMeme from "./CryptoMeme.vue"

const memeMessages = ["🚀 To the Moon!", "💎 HODL", "🐋 Whale Alert!"]


const selectedMovement = ref(null)

const openDetail = (movement) => {
  selectedMovement.value = movement
}

const movements = [
  {
    name: "Pump 🔥",
    description: "A sudden sharp increase in price, usually fast and with high volume.",
    cause: "Triggered by coordinated buying, news, or whale activity.",
    affect: "Short-term traders profit, but risk of a dump later.",
    meme: "To the moon! 🚀 HODL tight! When your bags finally moon 🌕💎",
    points: "0,40 20,30 40,10 60,0 80,0 100,5",
    color: "#34D399",
    bgColor: "#ECFDF5"
  },
  {
    name: "Dump 🔥",
    description: "A rapid price drop, often following a pump or negative news.",
    cause: "Whales selling off, panic selling, or bad news.",
    affect: "Retail investors suffer losses, price stability shaken.",
    meme:"Sell everything! 😱 *RIP portfolio… again…💀 ",
    points: "0,0 20,5 40,15 60,25 80,40 100,50",
    color: "#F87171",
    bgColor: "#FEF2F2"
  },
  {
    name: "Continuation 🔥",
    description: "Price pauses slightly before continuing the current trend.",
    cause: "Market confidence in ongoing trend.",
    affect: "Traders holding positions can benefit.",
    meme: "Trend keeps going… patience pays 📈 *Still climbing… or is it?",
    points: "0,30 20,25 40,20 60,18 80,15 100,12",
    color: "#60A5FA",
    bgColor: "#EFF6FF"
  },
  {
    name: "Consolidation 🔥",
    description: "Price moves sideways in a narrow range before next trend.",
    cause: "Market indecision, waiting for catalysts.",
    affect: "Breakouts often follow consolidations.",
    meme:"Sideways gang 🤷‍♂️ Waiting for the next big boom…",
    points: "0,25 20,23 40,26 60,24 80,25 100,23",
    color: "#FBBF24",
    bgColor: "#FFFBEB"
  },
  {
    name: "Reversal 🔥",
    description: "A change in trend direction, from bullish to bearish or vice versa.",
    cause: "Exhaustion of previous trend or strong opposite momentum.",
    affect: "Can trap late traders, creates new opportunities.",
    meme:"Wait… we were up? Now we’re down 😵 *Plot twist! 🌀",
    points: "0,40 20,38 40,30 60,20 80,10 100,5",
    color: "#A78BFA",
    bgColor: "#F5F3FF"
  },
  {
    name: "Fakeout 🔥",
    description: "Price briefly breaks out but quickly returns inside the range.",
    cause: "Market manipulation or low liquidity.",
    affect: "Traps breakout traders and causes losses.",
    meme:"Almost had me… 😤 *The trap is real…",
    points: "0,20 20,15 40,10 60,15 80,20 100,25",
    color: "#F472B6",
    bgColor: "#FDF2F8"
  },
  {
    name: "Whale Move 🔥",
    description: "Large buy/sell orders by whales influencing price.",
    cause: "Institutional players or high-net-worth traders acting.",
    affect: "Sudden volatility, liquidity shifts.",
    meme:"Whales incoming 🐋💦 *Price swings like a rollercoaster!",
    points: "0,25 20,20 40,10 60,30 80,10 100,40",
    color: "#22D3EE",
    bgColor: "#ECFEFF"
  },
  {
    name: "Breakout 🔥",
    description: "Price breaks above resistance or below support with volume.",
    cause: "Strong momentum, news, or mass psychology.",
    affect: "Often leads to large moves if sustained.",
    meme: "Breakout baby! 📈🔥  *We goin’ up!!",
    points: "0,30 20,28 40,25 60,15 80,10 100,0",
    color: "#10B981",
    bgColor: "#ECFDF5"
  },
  {
    name: "Correction 🔥",
    description: "Temporary decline after a strong upward movement.",
    cause: "Profit-taking, overbought conditions.",
    affect: "Healthy for long-term trends.",
    meme:"Just a little correction… breathe 😌 *Dip or trap?",
    points: "0,10 20,15 40,20 60,30 80,35 100,40",
    color: "#FB923C",
    bgColor: "#FFF7ED"
  },
  {
    name: "Capitulation",
    description: "A massive sell-off where traders give up positions at any price.",
    cause: "Extreme fear, liquidations, crashes.",
    affect: "Often signals market bottom.",
    meme:"Everyone panic sell! 🏃‍♂️💨  *Bottom incoming?",
    points: "0,0 20,5 40,10 60,20 80,35 100,50",
    color: "#DC2626",
    bgColor: "#FEF2F2"
  },
  {
    name: "Accumulation 🔥",
    description: "Smart money slowly buys at low prices over time.",
    cause: "Whales preparing for future rally.",
    affect: "Price stays stable until breakout.",
    meme:"Smart money stacking… 🤫  *HODL club in session.", 
    points: "0,30 20,29 40,31 60,32 80,30 100,31",
    color: "#16A34A",
    bgColor: "#F0FDF4"
  },
  {
    name: "Distribution 🔥",
    description: "Whales selling gradually at peak prices to retail traders.",
    cause: "Smart money exiting positions.",
    affect: "Price weakens after distribution ends.",
    meme:"Whales are selling… 😭 **Time to take profit?",
    points: "0,10 20,12 40,11 60,14 80,13 100,12",
    color: "#9333EA",
    bgColor: "#FAF5FF"
  },
  {
    name: "Retest 🔥",
    description: "Price breaks out of support/resistance and later comes back to test the same level.",
    cause: "Market checks if breakout level holds.",
    affect: "If confirmed, trend continues stronger; if failed, reversal likely.",
    meme: "Back again? 😅 *Testing my patience… Will it hold or fold? 🧐",
    points: "0,20 20,10 40,0 60,10 80,15 100,20",
    color: "#3B82F6",
    bgColor: "#EFF6FF"
  },
  {
    name: "Parabolic Run 🔥",
    description: "Price rises extremely fast in an exponential curve.",
    cause: "FOMO, viral hype, or massive demand.",
    affect: "Huge gains, but usually ends in sharp crash.",
    meme: "Whee! 🎢 *To the moon or straight to hell? 🚀💥",
    points: "0,40 20,35 40,25 60,15 80,5 100,0",
    color: "#F59E0B",
    bgColor: "#FFFBEB"
  },
  {
    name: "Bull Trap 🔥",
    description: "Price fakes a bullish breakout, then reverses downward.📉",
    cause: "Whales tricking retail traders.",
    affect: "Long traders lose money.",
    meme: "Thought I was rich… 💸 *But nope, back to the grind 😭",
    points: "0,30 20,20 40,10 60,15 80,30 100,40",
    color: "#EF4444",
    bgColor: "#FEF2F2"
  },
  {
    name: "Bear Trap 🔥",
    description: "📉Price dips below support, then quickly reverses upward.📈",
    cause: "Manipulation or forced liquidations.",
    affect: "Short traders get rekt, price rallies hard.",
    meme: "Shorted everything… 😱 *And they bounce? Thanks whales! 🐋",
    points: "0,10 20,20 40,30 60,25 80,15 100,5",
    color: "#10B981",
    bgColor: "#ECFDF5"
  },
  {
    name: "Short Squeeze 🔥",
    description: "Rapid upward move as shorts are forced to cover.",
    cause: "Many traders over-leveraged on shorts.",
    affect: "Price spikes violently upward.",
    meme: "Squeezed hard! 😳 *Shorts crying, longs partying 🎉",
    points: "0,40 20,38 40,25 60,15 80,5 100,0",
    color: "#8B5CF6",
    bgColor: "#F5F3FF"
  },
  {
    name: "Long Squeeze 🔥",
    description: "Sharp downward move as longs get liquidated.",
    cause: "Over-leveraged longs wiped out.",
    affect: "Price crashes fast.",
    meme: "Longs getting rekt! 💀 *Margin calls incoming…",
    points: "0,0 20,10 40,20 60,30 80,40 100,50",
    color: "#F43F5E",
    bgColor: "#FFF1F2"
  },
  {
    name: "Flash Crash 🔥",
    description: "Sudden extreme price drop in seconds/minutes.",
    cause: "Low liquidity, whale dump, liquidation cascade.",
    affect: "Extreme volatility, instant recovery sometimes.",
    meme: "Blink and you miss it 👀 *Price tanked then bounced 💥",
    points: "0,10 20,30 40,50 60,20 80,15 100,10",
    color: "#E11D48",
    bgColor: "#FEF2F2"
  },
  {
    name: "Fake Pump (Scam Pump)🔥",
    description: "📈Coordinated pump that ends quickly with a dump.📉",
    cause: "Pump-and-dump groups.",
    affect: "Small investors lose money, organizers profit.",
    meme: "Almost got me again 😤 *Scam pump strikes!",
    points: "0,30 20,20 40,10 60,15 80,35 100,40",
    color: "#FBBF24",
    bgColor: "#FFF7ED"
  },
  {
    name: "Range-Bound 🔥",
    description: "Price stuck between support and resistance levels.",
    cause: "Balance between buyers & sellers.",
    affect: "Boring sideways action until breakout.",
    meme: "Sideways life… 😐 *Waiting for the fireworks 🎆",
    points: "0,25 20,25 40,26 60,25 80,25 100,26",
    color: "#6B7280",
    bgColor: "#F3F4F6"
  },
  {
    name: "Dead Cat Bounce 🔥",
    description: "Temporary recovery after a huge drop, then continues falling.📉",
    cause: "Short-term traders buying oversold levels.",
    affect: "False hope, more downside after bounce.",
    meme: "Thought it’s over… 😅 *Just a dead cat bouncing 🐱💥",
    points: "0,50 20,30 40,40 60,35 80,45 100,50",
    color: "#9CA3AF",
    bgColor: "#9CA3AF"
  },
   {
    name: "Liquidity Drain 🔥",
    description: "Price suddenly drops due to large withdrawals or low liquidity pools.",
    cause: "Massive sell-offs or protocol liquidity removal.",
    affect: "Traders face slippage; short-term panic.",
    meme: "Where did the liquidity go? 😱 *Slippage city! 💦",
    points: "0,30 20,25 40,15 60,5 80,10 100,0",
    color: "#F97316",
    bgColor: "#FFF7ED"
  },
  {
    name: "Momentum Crash",
    description: "Strong upward momentum fails suddenly, price collapses.",
    cause: "Overbought conditions, weak support.",
    affect: "Late buyers get trapped, trend reversal.",
    meme: "We were flying! ✈️ *Now we’re crashing… 💥",
    points: "0,40 20,30 40,20 60,5 80,0 100,0",
    color: "#DC2626",
    bgColor: "#FEF2F2"
  },
  {
    name: "Pump Fakeout 🔥",
    description: "Price spikes briefly to lure buyers, then dumps.",
    cause: "Manipulation by whales or pump groups.",
    affect: "Retail traders get shaken out.",
    meme: "Almost had me… 😤 *Fake pump strikes again!",
    points: "0,20 20,25 40,15 60,10 80,5 100,0",
    color: "#F43F5E",
    bgColor: "#FFF1F2"
  },
  {
    name: "Slow Grind 🔥",
    description: "Price moves steadily in one direction with low volatility.",
    cause: "Balanced buying and selling pressure.",
    affect: "Good for trend traders, boring for day traders.",
    meme: "Just keep grinding… 🐢 *Steady wins the race!",
    points: "0,10 20,15 40,20 60,25 80,30 100,35",
    color: "#3B82F6",
    bgColor: "#EFF6FF"
  },
  {
    name: "Algo Attack",
    description: "High-frequency trading bots cause sudden swings.",
    cause: "Automated trading reacting to signals or arbitrage.",
    affect: "Spikes, dips, and confusion for human traders.",
    meme: "Bots be like 🤖 *Price chaos unleashed!",
    points: "0,15 20,35 40,25 60,40 80,20 100,30",
    color: "#8B5CF6",
    bgColor: "#F5F3FF"
  },
  {
    name: "Whale Absorption 🔥",
    description: "Large buys absorb all selling pressure, price stabilizes.",
    cause: "Whales buying all dips quietly.",
    affect: "Retail sellers get absorbed; trend can continue up.",
    meme: "Whales eating everything 🐋🍴 *Dip devoured!",
    points: "0,5 20,10 40,15 60,25 80,30 100,40",
    color: "#10B981",
    bgColor: "#ECFDF5"
  },
  {
    name: "FOMO Frenzy 🔥",
    description: "Rapid buying as traders fear missing out on a breakout.",
    cause: "News, hype, or social media virality.",
    affect: "Spikes price quickly but can end in a dump.",
    meme: "Everyone panic buy! 😱 *HODL or regret!",
    points: "0,20 20,35 40,50 60,40 80,30 100,20",
    color: "#FBBF24",
    bgColor: "#FFFBEB"
  },
  {
    name: "Squeaky Floor",
    description: "Support barely holds; price wobbles above level.",
    cause: "Weak buyers defending support.",
    affect: "Potential reversal if support fails.",
    meme: "Holding on for dear life 😬 *Will it break?",
    points: "0,15 20,25 40,20 60,25 80,20 100,22",
    color: "#EF4444",
    bgColor: "#FEF2F2"
  }
]
</script>

<style scoped>
.crypto-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1000;
}

.crypto-content {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 1250px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card {
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.detail-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1100;
}

.detail-content {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.detail-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.detail-description {
  margin-bottom: 1rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.chart-section {
  margin-bottom: 1.5rem;
}

.chart {
  width: 100%;
  height: 150px;
}

.meme {
  font-style: italic;
  color: #e11d48;
}

.close-btn {
  padding: 0.6rem 1.2rem;
  background: #f87171;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}
.close-btn:hover {
  background: #dc2626;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  *{
    color: #000;
  }
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 480px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
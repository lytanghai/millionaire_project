<template>
  <div class="meme-container">
    <transition-group name="pop" tag="div">
      <span v-for="(text, i) in activeTexts" :key="i" class="meme-text">
        {{ text }}
      </span>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  messages: {
    type: Array,
    default: () => ["🚀 To the Moon!", "💎 HODL", "😱 FOMO"]
  }
})

const activeTexts = ref([])

let i = 0
watch(
  () => props.messages,
  () => {
    if (props.messages.length > 0) {
      setInterval(() => {
        activeTexts.value = [props.messages[i % props.messages.length]]
        i++
      }, 2000)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.meme-container {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 1200;
}

.meme-text {
  font-size: 2rem;
  font-weight: bold;
  color: #f59e0b;
  text-shadow: 2px 2px 5px black;
  display: inline-block;
}

.pop-enter-active, .pop-leave-active { transition: all 0.5s ease; }
.pop-enter-from { opacity: 0; transform: translateY(-20px) scale(0.5); }
.pop-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.pop-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.pop-leave-to { opacity: 0; transform: translateY(-20px) scale(0.5); }
</style>

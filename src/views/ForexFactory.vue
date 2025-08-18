<template>
  <div class="forex-container">
    <!-- Back Button -->
    <button class="back-button" @click="goBack">Back</button>

    <h1 class="page-title">Forex Factory Economic Calendar</h1>

    <div class="iframe-wrapper">
      <iframe
        src="https://www.forexfactory.com/calendar.php"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back(); // Return to previous page
};
</script>

<style scoped>
.forex-container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.back-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: #eb6a25;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}

.back-button:hover {
  background-color: #1d4ed8;
}

.page-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 75%; /* Maintain aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>

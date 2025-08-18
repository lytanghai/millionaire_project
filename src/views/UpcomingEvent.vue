<template>
  <div class="page-container">
    <!-- Header -->
    <div class="header">
      <button class="back-button" @click="goBack">← Back</button>
    </div>

    <!-- Upcoming Events -->
    <h1 class="section-title">Upcoming Events 🔥</h1>

    <div v-if="loading" class="loading">Loading events...</div>
    <div v-else-if="events.length === 0" class="no-data">No upcoming events</div>
    <div v-else>
      <div
        v-for="item in events"
        :key="item.id"
        class="card"
      >
        <div class="card-header">
          <span class="event-name">{{ item.event }}</span>
          <span class="schedule">{{ formatSchedule(item.schedule) }}</span>
        </div>
        <div class="card-body">
          <div class="detail"><strong>Expected:</strong> {{ item.expected }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { backend_url } from '@/assets/data/common';

const router = useRouter();
const goBack = () => router.back();

const loading = ref(false);
const events = ref([]);

const formatSchedule = (ts) => {
  const d = new Date(ts);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hour}:${min}`;
};

onMounted(async () => {
  loading.value = true;
  try {
    const url = `${backend_url}/source-of-news/fetch`;
    const jwtToken = localStorage.getItem('token');
    const res = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${jwtToken}`, 'Content-Type': 'application/json' }
    });
    if (res.data.status === 'success') {
      // Sort events by schedule (earliest first)
      events.value = res.data.data.sort((a, b) => new Date(a.schedule) - new Date(b.schedule));
    }
  } catch (err) {
    console.error('Failed to fetch events:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f3f4f6;
  max-height: 100vh;
  overflow-y: auto;
}

/* Header styling */
.header {
  display: flex;
  justify-content: flex-start; /* back button on the left */
  margin-bottom: 1rem;
}

.back-button {
  padding: 0.5rem 1rem;
  font-weight: 600;
  background: #1d4ed8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.back-button:hover { background: #2563eb; }

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 0.5rem;
}

.card {
  background: linear-gradient(135deg, #ffffff, #fef3c7);
  border-radius: 16px;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.3rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.event-name { font-size: 1rem; color: #111827; }
.schedule { color: #374151; font-size: 0.9rem; }
.loading, .no-data { text-align: center; padding: 1rem; font-style: italic; color: #6b7280; }

@media (max-width: 480px) {
  .page-container { padding: 0.5rem; }
  .card { padding: 0.6rem 0.8rem; border-radius: 12px; }
  .section-title { font-size: 1.2rem; }
  .event-name { font-size: 0.95rem; }
}
</style>

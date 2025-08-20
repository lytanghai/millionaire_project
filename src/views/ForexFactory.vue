<template>
  <div class="page-container">
    <!-- Header with Back and Upcoming buttons -->
    <div class="header-buttons">
      <button class="back-button" @click="goBack">← Back</button>
      <button class="next-button" @click="goToUpcomingEvents">
        View Upcoming Events 🔥
      </button>
    </div>

    <!-- Main Actions -->
    <div class="main-actions">
      <button class="upload-button" @click="openFileDialog">Upload File</button>
      <button class="sample-button" @click="downloadSample">Download Sample File</button>
      <button class="crypto-movement" @click="openCryptoMovement">
        Crypto Movement Cheat Sheet
      </button>
    </div>

    <!-- Hidden File Input -->
    <input type="file" ref="fileInput" style="display:none" @change="confirmFileUpload" />

    <!-- Guidelines Section -->
    <div class="section-container">
      <h1 class="section-title">Crypto Event Guidelines</h1>
      <div v-for="(item, index) in sortedGuidelines" :key="index" class="card">
        <div class="card-header">
          <span class="event-name">{{ item.event }}</span>
          <span :class="['impact-badge', item.impactClass]">{{ item.impact }}</span>
        </div>
        <div class="card-body">
          <div class="detail"><strong>Guideline:</strong> {{ item.guideline }}</div>
          <div class="detail">
            <strong>Recommendation:</strong>
            <span :class="['recommendation-badge', getRecommendationClass(item.guideline)]">
              {{ getRecommendation(item.guideline) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Crypto Movement Modal -->
    <CryptoMovement v-if="showCryptoMovement" @close="showCryptoMovement = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { backend_url } from '@/assets/data/common';
import CryptoMovement from '@/components/CryptoMovement.vue';

const router = useRouter();
const fileInput = ref(null);
const showCryptoMovement = ref(false);

const goBack = () => router.back();
const goToUpcomingEvents = () => router.push({ name: 'upcoming' });

const downloadSample = async () => {
  const confirmed = window.confirm("Do you want to download the sample file?");
  if (!confirmed) return;

  try {
    const jwtToken = localStorage.getItem('token');
    const response = await axios.get(`${backend_url}/source-of-news/download-sample`, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${jwtToken}` }
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'upcoming.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed', error);
  }
};

const openCryptoMovement = () => { showCryptoMovement.value = true; }

const openFileDialog = () => {
  fileInput.value.value = null;
  fileInput.value.click();
};

const confirmFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (confirm(`Are you sure you want to upload "${file.name}"?`)) uploadFile(file);
};

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const jwtToken = localStorage.getItem('token');
    const response = await axios.post(`${backend_url}/source-of-news/upload`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('File uploaded successfully!');
    console.log(response.data);
  } catch (err) {
    console.error('File upload failed:', err);
    alert('File upload failed.');
  }
};

// Guidelines logic
const guidelines = [
  { event: 'CPI (Consumer Price Index)', impact: 'High', impactClass: 'red', level: 3, guideline: 'Actual > Expected = bullish' },
  { event: 'Interest Rate Hike (Fed/ECB)', impact: 'High', impactClass: 'red', level: 3, guideline: 'Actual > Expected = bearish' },
  { event: 'FOMC Meeting Minutes', impact: 'High', impactClass: 'red', level: 3, guideline: 'Actual ~ Expected = neutral' },
  { event: 'ECB Press Conference', impact: 'High', impactClass: 'red', level: 3, guideline: 'Actual > Expected = bearish' },
  { event: 'Non-Farm Payrolls', impact: 'Medium', impactClass: 'yellow', level: 2, guideline: 'Actual > Expected = bullish' },
  { event: 'GDP Growth', impact: 'Medium', impactClass: 'yellow', level: 2, guideline: 'Actual > Expected = bullish' },
  { event: 'Unemployment Rate', impact: 'Medium', impactClass: 'yellow', level: 2, guideline: 'Actual < Expected = bullish' },
  { event: 'PPI (Producer Price Index)', impact: 'Medium', impactClass: 'yellow', level: 2, guideline: 'Actual > Expected = bullish' },
  { event: 'ISM Manufacturing PMI', impact: 'Medium', impactClass: 'yellow', level: 2, guideline: 'Actual > Expected = bullish' },
  { event: 'Retail Sales', impact: 'Low', impactClass: 'green', level: 1, guideline: 'Actual > Expected = bullish' },
  { event: 'Consumer Confidence Index', impact: 'Low', impactClass: 'green', level: 1, guideline: 'Actual ~ Expected = neutral' }
];

const sortedGuidelines = guidelines.sort((a, b) => b.level - a.level);
const getRecommendation = (g) => g.includes('bullish') ? 'Buy' : g.includes('bearish') ? 'Sell' : 'Hold';
const getRecommendationClass = (g) => g.includes('bullish') ? 'green' : g.includes('bearish') ? 'red' : 'yellow';
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #0f172a;
  height: 100vh;
  color: #f1f5f9;
  overflow-y: auto;
}

/* Header buttons */
.header-buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.back-button,
.next-button {
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.back-button {
  background: #1e293b;
  color: #f1f5f9;
}

.back-button:hover {
  background: #334155;
}

.next-button {
  background: #f59e0b;
  color: #1f2937;
}

.next-button:hover {
  background: #d97706;
}

/* Main action buttons */
.main-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.upload-button,
.sample-button,
.crypto-movement {
  flex: 1 1 200px;
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.upload-button {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: white;
}

.upload-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 255, 128, 0.3);
}

.sample-button {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: #1f2937;
}

.sample-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
}

.crypto-movement {
  background: linear-gradient(135deg, #4f46e5, #818cf8);
  color: white;
}

.crypto-movement:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(128, 128, 255, 0.3);
}

/* Guidelines cards */
.section-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3%;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fbbf24;
}

.card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.event-name {
  font-size: 1rem;
  font-weight: 600;
}

.impact-badge.red {
  background: #dc2626;
  padding: 0.3rem;
}

.impact-badge.yellow {
  background: #ca8a04;
  padding: 0.3rem;
}

.impact-badge.green {
  background: #16a34a;
  padding: 0.3rem;
}

.recommendation-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
}

/* Responsive */
@media (max-width: 480px) {
  .main-actions {
    flex-direction: column;
  }

  .back-button,
  .next-button {
    flex: 1 1 100%;
  }
  
  .upload-button,
  .sample-button,
  .crypto-movement {
    flex: none;             /* remove the 200px min */
    width: 100%;            /* make them full width */
    height: 36px;           /* smaller height */
    padding: 0.2rem 0.5rem; /* tighter padding */
    font-size: 0.85rem;     /* shrink text a little */
    border-radius: 8px;     /* less rounded on small screens */
  }

}
</style>

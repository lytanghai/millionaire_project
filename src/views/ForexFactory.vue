<template>
  <div class="page-container">
    <!-- Header with Back and Upcoming buttons -->
    <div class="header-buttons">
      <button class="back-button" @click="goBack">← Back</button>
      <button class="next-button" @click="goToUpcomingEvents">
        View Upcoming Events 🔥
      </button>
    </div>

    <!-- File Buttons -->
    <div class="file-buttons">
      <button class="sample-button" @click="downloadSample">
        Download Sample File
      </button>
      <button class="upload-button" @click="openFileDialog">
        Upload File
      </button>
    </div>

    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      style="display:none"
      @change="confirmFileUpload"
    />

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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { backend_url } from '@/assets/data/common';

const router = useRouter();
const fileInput = ref(null);

const goBack = () => router.back();
const goToUpcomingEvents = () => router.push({ name: 'upcoming' });

const downloadSample = () => {
  const link = document.createElement('a');
  link.href = import.meta.env.BASE_URL + 'upcoming.xlsx';
  link.download = 'upcoming.xlsx';
  link.click();
};

const openFileDialog = () => {
  fileInput.value.value = null;
  fileInput.value.click();
};

const confirmFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (confirm(`Are you sure you want to upload "${file.name}"?`)) {
    uploadFile(file);
  }
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
const getRecommendation = (guideline) =>
  guideline.includes('bullish') ? 'Buy' : guideline.includes('bearish') ? 'Sell' : 'Hold';
const getRecommendationClass = (guideline) =>
  guideline.includes('bullish') ? 'green' : guideline.includes('bearish') ? 'red' : 'yellow';
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

/* Header buttons container */
.header-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.file-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.sample-button,
.upload-button {
  flex: 1;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.sample-button { background: #f59e0b; }
.sample-button:hover { background: #d97706; }

.upload-button { background: #16a34a; }
.upload-button:hover { background: #15803d; }

.back-button,
.next-button {
  padding: 0.5rem 1rem;
  font-weight: 600;
  background: #4b588b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.back-button:hover,
.next-button:hover {
  background: #eb4d25;
}

.section-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

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

.impact-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.85rem;
  color: white;
}
.red { background: #dc2626; }
.yellow { background: #ca8a04; }
.green { background: #16a34a; }

.recommendation-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
}
</style>

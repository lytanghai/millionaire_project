<template>
    <div class="login-wrapper-container">
        <div class="login-wrapper">
            <form @submit.prevent="handleSubmit" class="login-form" novalidate>
                <h2>Login</h2>

                <label for="username">Username</label>
                <input id="username" type="text" v-model.trim="username" placeholder="Enter username" required />
                <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>

                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" placeholder="Enter password" required />
                <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>

                <button type="submit" :disabled="loading">
                    <span v-if="loading" class="spinner"></span>
                    Login
                </button>

                <p v-if="errorMsg" class="error-msg server-error">{{ errorMsg }}</p>
            </form>

            <div v-if="token" class="success-msg">
                <p>Welcome, <strong>{{ username }}</strong>!</p>
                <p>App Version: {{ appVersion }}</p>
                <p><code>Token:</code> {{ token }}</p>
            </div>
        </div>
        <!-- Redirecting overlay -->
        <div v-if="redirecting" class="redirecting-overlay">
            <h1>
                Redirecting<span class="dots"><span>.</span><span>.</span><span>.</span></span>
            </h1>
            <div class="particles">
                <span class="particle" v-for="n in 8" :key="n"></span>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { setToken } from '@/assets/token'  // Your token helper functions
import { backend_url } from '@/assets/data/common';

const router = useRouter()

const username = ref('')
const password = ref('')
const errors = reactive({ username: '', password: '' })
const loading = ref(false)
const errorMsg = ref('')
const token = ref('')
const appVersion = ref('')

const validate = () => {
    errors.username = username.value ? '' : 'Username is required.'
    errors.password = password.value ? '' : 'Password is required.'
    return !errors.username && !errors.password
}

const redirecting = ref(false)  // new state

const handleSubmit = async () => {
    if (!validate()) return

    loading.value = true
    errorMsg.value = ''
    token.value = ''
    appVersion.value = ''

    try {
        const res = await fetch(backend_url + '/public/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value }),
        })

        if (!res.ok) {
            errorMsg.value = `Login failed: ${res.statusText}`
            loading.value = false
            return
        }

        const data = await res.json()
        // Save token and redirect
        setToken(data.token)
        token.value = data.token
        appVersion.value = data.app_version
        username.value = data.username

        redirecting.value = true  // show animation
        setTimeout(() => {
            router.push('/')
        }, 2000)
    } catch (e) {
        errorMsg.value = 'Network error, please try again.'
    } finally {
        loading.value = false
    }
}
</script>


<style scoped>
.login-wrapper {
    width: 500px;
    margin: 3rem auto;
    padding: 2rem;
    background: #1e293b;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    color: #e2e8f0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-wrapper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1rem;
    background: #0f172a;
    box-sizing: border-box;
}


.login-form {
    display: flex;
    flex-direction: column;
}

h2 {
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: #38bdf8;
}

label {
    margin-bottom: 0.4rem;
    font-weight: 600;
}

input {
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: none;
    margin-bottom: 1rem;
    font-size: 1rem;
    background: #334155;
    color: #f1f5f9;
    outline-offset: 2px;
    transition: outline-color 0.3s ease;
}

input:focus {
    outline: 2px solid #38bdf8;
}

button {
    background: linear-gradient(90deg, #38bdf8, #3b82f6);
    border: none;
    color: white;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background: linear-gradient(90deg, #3b82f6, #38bdf8);
}

.error-msg {
    color: #f87171;
    font-size: 0.9rem;
    margin-top: -0.6rem;
    margin-bottom: 0.8rem;
}

.server-error {
    margin-top: 1rem;
    text-align: center;
}

.success-msg {
    margin-top: 2rem;
    padding: 1rem;
    background: #0f172a;
    border-radius: 10px;
    word-break: break-word;
    font-size: 0.95rem;
    color: #a7f3d0;
}

.spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Animation */
.redirecting-overlay {
  position: fixed;
  inset: 0;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: #e2e8f0;
  user-select: none;
}

/* Use your existing .dots and .particle styles if you want, or define these minimal */
.dots span {
  animation-name: blink;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  opacity: 0;
  margin-left: 3px;
}
.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.3s; }
.dots span:nth-child(3) { animation-delay: 0.6s; }

@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
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


/* Responsive */
@media (max-width: 480px) {
    .login-wrapper {
        margin: 2rem 1rem;
        padding: 1.5rem;
    }

    button {
        font-size: 1rem;
    }
}
</style>

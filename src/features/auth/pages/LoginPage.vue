<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import LoginForm from '../components/LoginForm.vue';

const loading = ref(true);
const percentage = ref(0);

let loadInterval: any;

onMounted(() => {
    loadInterval = setInterval(() => {
        percentage.value = percentage.value + 5;
    }, 200);
});

watch(percentage, (newPer, oldPer) => {
    if (newPer >= 100) {
        clearInterval(loadInterval as unknown as number);
        loading.value = false;
    }
});

const isLoaded = computed(() => {
    return percentage.value >= 100;
});
</script>

<template>
    <div
        v-if="loading"
        class="d-flex flex-row align-items-end justify-content-center"
        style="
            width: 100vw;
            height: 100vh;
            background-image: url(images/bg-load.png);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        "
    >
        <div
            class="d-flex flex-row align-items-start justify-content-center"
            style="width: 100%; height: 10%"
        >
            <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="percentage"
                :status="isLoaded ? 'success' : ''"
                style="width: 70%; max-width: 800px"
            ></el-progress>
        </div>
    </div>
    <LoginForm v-else />
</template>

<style scoped></style>

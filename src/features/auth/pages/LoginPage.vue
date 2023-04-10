<script setup lang="ts">
import { PageName } from '@/common/constants';
import { Lock, Phone } from '@element-plus/icons-vue';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(true);
const percentage = ref(0);

const phone = ref();
const password = ref();
const remember = ref(false);

const container = ref(null);
const bgWidth = ref();
const bgHeight = ref();

let loadInterval: any;

onBeforeMount(() => {
    window.addEventListener('resize', () => {
        bgWidth.value = (
            container.value as unknown as HTMLElement
        )?.offsetWidth;
        bgHeight.value = (
            container.value as unknown as HTMLElement
        )?.offsetHeight;
    });
});
onMounted(() => {
    bgWidth.value = (container.value as unknown as HTMLElement)?.offsetWidth;
    bgHeight.value = (container.value as unknown as HTMLElement)?.offsetHeight;

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

const onClickLogin = () => {
    router.push({ name: PageName.CLASS_PAGE });
};
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
    <div
        v-else
        class="container"
        ref="container"
        id="container"
        :style="{ backgroundSize: `${bgWidth}px ${bgHeight}px` }"
    >
        <div>
            <el-input
                v-model="phone"
                type="text"
                class="mb-2 input"
                placeholder="Nhập số điện thoại"
            >
                <template #prefix>
                    <Phone style="width: 1em; height: 1em; margin-right: 8px" />
                </template>
            </el-input>
            <el-input
                v-model="password"
                type="password"
                class="mb-3 input"
                placeholder="Mật khẩu"
            >
                <template #prefix>
                    <Lock style="width: 1em; height: 1em; margin-right: 8px" />
                </template>
            </el-input>
            <div
                class="d-flex flex-row flex-wrap justify-content-between align-content-center mb-3"
            >
                <el-checkbox
                    v-model="remember"
                    label="Nhớ tài khoản"
                    class="remember"
                />
                <router-link
                    :to="{ name: PageName.CLASS_PAGE }"
                    class="text-decoration-none forget"
                    >Quên mật khẩu</router-link
                >
            </div>
        </div>
        <div class="mb-3">
            <el-button
                class="login-btn position-relative"
                @click="onClickLogin"
            >
                <template #default>
                    Đăng nhập
                    <img
                        src="@/assets/images/sun.png"
                        alt=""
                        class="position-absolute"
                        style="width: 42px; left: -5px; top: -18px"
                    />
                </template>
            </el-button>
        </div>
        <div>
            <span class="register">
                Bạn chưa có tài khoản?
                <router-link
                    :to="{ name: PageName.CLASS_PAGE }"
                    class="text-decoration-none register-link"
                    >Đăng ký ngay</router-link
                >
            </span>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 550px;
    margin: 0 24px;
    padding: 120px 100px 90px 100px;
    background-image: url('@/assets/images/login-board.png');
    background-position: center;
    background-repeat: no-repeat;
}
.input {
    height: 42px;
}
:deep(.el-input__wrapper) {
    border-radius: 21px;
}
.remember {
    color: white;
}
.forget {
    color: yellow;
}
.login-btn {
    padding: 24px 40px;
    font-size: 22px;
    line-height: 24px;
    background-color: #ffe759;
    color: white;
    text-shadow: 0 0 8px #b87835;
}
.register {
    color: white;
}
.register-link {
    color: yellow;
}
@media (max-width: 520px) {
    .container {
        padding-left: 15%;
        padding-right: 15%;
    }
    .input {
        height: 32px;
        margin-bottom: 2px !important;
    }
    .remember {
        height: 16px;
    }
    .forget {
        font-size: 15px;
    }
    .login-btn {
        font-size: 18px;
        padding: 18px 22px;
    }
}
</style>

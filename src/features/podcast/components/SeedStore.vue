<script setup lang="ts">
import { computed } from 'vue';

interface Prop {
    isShow: boolean;
}

const prop = withDefaults(defineProps<Prop>(), {
    isShow: false,
});
const emit = defineEmits(['close', 'choose-seed']);

const seeds = [
    {
        image: new URL('@/assets/images/seed-0.png', import.meta.url).href,
        name: 'Hạt giống lê',
    },
    {
        image: new URL('@/assets/images/seed-1.png', import.meta.url).href,
        name: 'Hạt giống cam',
    },
    {
        image: new URL('@/assets/images/seed-2.png', import.meta.url).href,
        name: 'Hạt giống táo',
    },
    {
        image: new URL('@/assets/images/seed-3.png', import.meta.url).href,
        name: 'Hạt giống xoài',
    },
];

const isShowPopup = computed(() => {
    return prop.isShow;
});

const onClose = () => {
    emit('close');
};

const onChooseSeed = (seedIndex: number) => {
    emit('choose-seed', seedIndex);
};
</script>

<template>
    <el-dialog
        v-model="isShowPopup"
        @close="onClose"
        title="Chọn hạt giống"
        class="el-ddialog"
    >
        <div class="row">
            <div
                v-for="(seed, index) in seeds"
                :key="index"
                class="col-sm-4 seed-ctn"
            >
                <img
                    :src="seed.image"
                    alt=""
                    class="seed-img"
                    @click="onChooseSeed(index)"
                />
                <span class="seed-name">{{ seed.name }}</span>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped>
:v-deep(.el-ddialog) {
    background-color: #efe4b0 !important;
    border-radius: 8px !important;
}
.seed-img {
    width: 100%;
    margin-bottom: 8px;
}
.seed-ctn {
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.seed-ctn:hover {
    border: 2px solid red;
    cursor: pointer;
}
.seed-name {
    color: red;
    font-size: 18px;
    font-family: 'Faustina', serif;
}
</style>

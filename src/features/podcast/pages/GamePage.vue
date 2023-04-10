<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { usePodcastStore } from '../store';
import SeedStore from '../components/SeedStore.vue';

const podcastStore = usePodcastStore();

const treeList = [
    [
        {
            wateringTime: 0,
            path: new URL('@/assets/images/tree-0-0.png', import.meta.url).href,
        },
        {
            wateringTime: 1,
            path: new URL('@/assets/images/tree-0-1.png', import.meta.url).href,
        },
        {
            wateringTime: 2,
            path: new URL('@/assets/images/tree-0-2.png', import.meta.url).href,
        },
        {
            wateringTime: 3,
            path: new URL('@/assets/images/tree-0-3.png', import.meta.url).href,
        },
    ],
    [
        {
            wateringTime: 0,
            path: new URL('@/assets/images/tree-1-0.png', import.meta.url).href,
        },
        {
            wateringTime: 1,
            path: new URL('@/assets/images/tree-1-1.png', import.meta.url).href,
        },
        {
            wateringTime: 2,
            path: new URL('@/assets/images/tree-1-2.png', import.meta.url).href,
        },
        {
            wateringTime: 3,
            path: new URL('@/assets/images/tree-1-3.png', import.meta.url).href,
        },
    ],
    [
        {
            wateringTime: 0,
            path: new URL('@/assets/images/tree-2-0.png', import.meta.url).href,
        },
        {
            wateringTime: 1,
            path: new URL('@/assets/images/tree-2-1.png', import.meta.url).href,
        },
        {
            wateringTime: 2,
            path: new URL('@/assets/images/tree-2-2.png', import.meta.url).href,
        },
        {
            wateringTime: 3,
            path: new URL('@/assets/images/tree-2-3.png', import.meta.url).href,
        },
    ],
    [
        {
            wateringTime: 0,
            path: new URL('@/assets/images/tree-3-0.png', import.meta.url).href,
        },
        {
            wateringTime: 1,
            path: new URL('@/assets/images/tree-3-1.png', import.meta.url).href,
        },
        {
            wateringTime: 2,
            path: new URL('@/assets/images/tree-3-2.png', import.meta.url).href,
        },
        {
            wateringTime: 3,
            path: new URL('@/assets/images/tree-3-3.png', import.meta.url).href,
        },
    ],
];

const isShowStorePopup = ref(false);
const treeIndex = ref(0);
const treeLevel = ref(0);
const wateringEnabled = ref(false);
const continueWatering = ref(true);
const wateringMsg = ref('Tưới nước');

onMounted(() => {
    document.getElementsByTagName(
        'body'
    )[0].style.backgroundImage = `url("images/bg.png")`;
});

const getTreeIndex = computed(() => {
    return treeIndex.value;
});
const getTreeLevel = computed(() => {
    return treeLevel.value;
});

const onClickSeedStore = () => {
    isShowStorePopup.value = true;
};
const onChooseSeed = (seedIndex: number) => {
    podcastStore.setHaveTree(true);
    treeIndex.value = seedIndex;
    onCloseSeedStore();
};
const onCloseSeedStore = () => {
    isShowStorePopup.value = false;
};
const onClickWaterCan = () => {
    if (wateringEnabled.value || !continueWatering.value) {
        return;
    }
    continueWatering.value = false;
    wateringEnabled.value = true;
    setTimeout(() => {
        if (treeIndex.value === 0) {
            continueWatering.value = true;
        }
        wateringEnabled.value = false;
        wateringMsg.value =
            'Bạn đã hết lượt tưới nước. Hãy nghe podcast để nhận thêm';

        podcastStore.setWateringTime(podcastStore.wateringTime + 1);
        if (
            treeLevel.value <= treeList[treeIndex.value].length &&
            podcastStore.wateringTime ===
                treeList[treeIndex.value][treeLevel.value + 1]?.wateringTime
        ) {
            treeLevel.value += 1;
        }
    }, 3000);
};
</script>

<template>
    <div class="container">
        <div v-if="!podcastStore.haveTree">
            <el-button
                class="new-btn position-relative"
                @click="onClickSeedStore"
            >
                <template #default>
                    <img
                        src="@/assets/images/point.gif"
                        alt=""
                        class="position-absolute point"
                    />
                    Trồng cây mới
                </template>
            </el-button>
        </div>
        <div
            v-else
            class="d-flex flex-column align-items-center"
            style="max-width: 700px; margin: auto"
        >
            <div class="position-relative tree-ctn">
                <img
                    :src="treeList[treeIndex][treeLevel].path"
                    alt=""
                    class="tree"
                />
                <img
                    id="watering"
                    src="@/assets/images/watering.png"
                    alt=""
                    class="position-absolute"
                    :class="{ watering: wateringEnabled }"
                />
            </div>
            <div class="d-flex justify-content-between" style="width: 50%">
                <div class="btn-ctn">
                    <img
                        src="@/assets/images/more-water.png"
                        alt=""
                        class="game-btn"
                    />
                </div>
                <el-tooltip
                    effect="light"
                    placement="top"
                    :content="getTreeIndex === 0 ? 'Tưới nước' : wateringMsg"
                >
                    <div class="btn-ctn" @click="onClickWaterCan">
                        <img
                            src="@/assets/images/water-can.png"
                            alt=""
                            class="game-btn"
                        />
                        <span>Tưới nước</span>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <SeedStore
            :isShow="isShowStorePopup"
            @close="onCloseSeedStore"
            @choose-seed="onChooseSeed"
        />
    </div>
</template>

<style scoped>
.container {
    padding: 150px 20px 50px 20px;
}
.new-btn {
    background-color: #fec611;
    border: none;
    border-radius: 20px;
    font-size: 23px;
    font-weight: 700;
    color: white;
    height: 40px;
    text-shadow: 0px 0px 5px #002f6d;
}
.point {
    left: -45px;
    top: -10px;
    width: 60px;
}
.new-btn:hover {
    box-shadow: 0 0 10px 0px white;
}
.tree-ctn {
    max-width: 400px;
    width: 100%;
    margin-bottom: 20px;
}
.tree {
    width: 100%;
}
.btn-ctn {
    border-radius: 50%;
    width: 68px;
    height: 68px;
    cursor: pointer;
}
.btn-ctn > span {
    white-space: nowrap;
    color: white;
    font-weight: 600;
    text-shadow: 0 0 6px black;
}
.btn-ctn:hover {
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 255, 0.2);
}
.game-btn {
    width: 100%;
    height: 100%;
}
#watering {
    display: none;
    right: 12px;
    width: 200px;
}
.watering {
    display: block !important;
    animation-name: watering;
    animation-duration: 1s;
    animation-iteration-count: 3;
}

@keyframes watering {
    from {
        top: 0;
    }
    to {
        top: 75px;
    }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePodcastStore } from '../store';
import SeedStore from '../components/SeedStore.vue';

const podcastStore = usePodcastStore();

const treeList = [
    {
        wateringTime: 0,
    },
    {
        wateringTime: 1,
    },
    {
        wateringTime: 2,
    },
    {
        wateringTime: 3,
    },
];

const isShowStorePopup = ref(false);
const treeIndex = ref(0);
const treeLevel = ref(0);
const wateringEnabled = ref(false);
const continueWatering = ref(true);
const wateringMsg = ref('Tưới nước');

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
        wateringEnabled.value = false;
        wateringMsg.value =
            'Bạn đã hết lượt tưới nước. Hãy nghe podcast để nhận thêm';

        podcastStore.setWateringTime(podcastStore.wateringTime + 1);
        if (
            treeLevel.value <= treeList.length &&
            podcastStore.wateringTime ===
                treeList[treeLevel.value + 1]?.wateringTime
        ) {
            treeLevel.value += 1;
        }
    }, 3000);
};
</script>

<template>
    <div class="container">
        <div v-if="!podcastStore.haveTree">
            <el-button class="new-btn" @click="onClickSeedStore"
                >Trồng cây mới</el-button
            >
        </div>
        <div
            v-else
            class="d-flex flex-column align-items-center"
            style="max-width: 700px; margin: auto"
        >
            <div class="position-relative tree-ctn">
                <!-- <img :src="treeList[treeLevel].path" alt="" class="tree" /> -->
                <img
                    :src="`/src/assets/images/tree-${getTreeIndex}-${getTreeLevel}.png`"
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
                    :content="wateringMsg"
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
}
.new-btn:hover {
    box-shadow: 0 0 10px 0px white;
}
.tree-ctn {
    max-width: 450px;
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

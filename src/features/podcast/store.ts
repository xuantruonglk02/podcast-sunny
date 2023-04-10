import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const usePodcastStore = defineStore('podcast', () => {
    const haveTree: Ref<boolean> = ref(false);
    const treeIndex: Ref<number> = ref(0);
    const wateringTime: Ref<number> = ref(0);
    const treeLevel: Ref<number> = ref(0);

    const setHaveTree = (value: boolean) => {
        haveTree.value = value;
    };
    const setTreeIndex = (value: number) => {
        treeIndex.value = value;
    };
    const setWateringTime = (value: number) => {
        wateringTime.value = value;
    };
    const setTreeLevel = (value: number) => {
        treeLevel.value = value;
    };

    return {
        haveTree,
        treeIndex,
        wateringTime,
        treeLevel,
        setHaveTree,
        setTreeIndex,
        setWateringTime,
        setTreeLevel,
    };
});

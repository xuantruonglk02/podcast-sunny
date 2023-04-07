import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const usePodcastStore = defineStore('podcast', () => {
    const haveTree: Ref<boolean> = ref(false);
    const wateringTime: Ref<number> = ref(0);

    const setHaveTree = (value: boolean) => {
        haveTree.value = value;
    };
    const setWateringTime = (value: number) => {
        wateringTime.value = value;
    };

    return {
        haveTree,
        wateringTime,
        setHaveTree,
        setWateringTime,
    };
});

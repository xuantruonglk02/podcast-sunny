<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Prop {
    topicName: string;
    podcast: {
        image: string;
        name: string;
        sound: string;
    };
}

withDefaults(defineProps<Prop>(), {});
const emit = defineEmits(['ended']);

const audio = ref(null);
const playing = ref(false);

onMounted(() => {
    (audio.value as unknown as HTMLElement).addEventListener('ended', (e) => {
        emit('ended');
    });
});

const onClickPlayAudio = () => {
    if (playing.value) {
        (audio.value as any).pause();
    } else {
        (audio.value as any).play();
    }
    playing.value = !playing.value;
};
</script>

<template>
    <div
        class="position-absolute d-flex flex-column align-items-center podcast-content"
    >
        <h4>Chủ đề: {{ topicName }}</h4>
        <img :src="podcast.image" alt="" class="podcast-img mb-1" />
        <span class="mb-2">{{ podcast.name }}</span>
        <div class="mb-2">
            <div v-if="playing" class="audio-btn-ctn" @click="onClickPlayAudio">
                <img
                    src="@/assets/icons/pause-solid.svg"
                    alt=""
                    class="audio-btn"
                />
            </div>
            <div v-else class="audio-btn-ctn" @click="onClickPlayAudio">
                <img
                    src="@/assets/icons/play-solid.svg"
                    alt=""
                    class="audio-btn"
                />
            </div>
        </div>
        <audio
            id="audio"
            ref="audio"
            :src="podcast.sound"
            controls
            class="audio"
            disablepictureinpicture
            controlslist="nodownload noplaybackrate"
        />
    </div>
</template>

<style scoped>
.podcast-content {
    top: 0;
    left: 0;
    width: 100%;
    padding: 70px 30px 0 30px;
}
.podcast-img {
    max-width: 150px;
    width: 30%;
    border-radius: 8px;
}
.audio-btn-ctn {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
}
.audio-btn-ctn:hover {
    background-color: rgba(255, 255, 255, 0.8);
}
.audio-btn {
    width: 50%;
}
audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display,
audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-pause-button,
audio::-webkit-media-controls-mute-button,
audio::-webkit-media-controls-volume-slider-container,
audio::-webkit-media-controls-volume-slider {
    display: none;
}
audio::-webkit-media-controls-enclosure {
    background-color: rgba(255, 255, 255, 0.5);
}
audio {
    pointer-events: none;
}
</style>
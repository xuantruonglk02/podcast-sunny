<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Prop {
    topicName: string;
    podcast: {
        image: string;
        name: string;
        sound: string;
        title: string;
    };
}

withDefaults(defineProps<Prop>(), {});
const emit = defineEmits(['ended', 'pre', 'next']);

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
const onClickMove = (e: number) => {
    if (e === -1) {
        emit('pre');
    } else {
        emit('next');
    }
};
</script>

<template>
    <div
        class="position-absolute d-flex flex-column align-items-center podcast-content justify-content-center"
    >
        <img :src="podcast.image" alt="" class="podcast-img mb-3" />
        <span
            class="mb-3"
            style="
                font-family: 'Baloo 2', cursive;
                font-size: 22px;
                font-weight: 600;
            "
            >{{ podcast.title.toUpperCase() }}</span
        >
        <audio
            id="audio"
            ref="audio"
            :src="podcast.sound"
            controls
            class="audio mb-2"
            disablepictureinpicture
            controlslist="nodownload noplaybackrate"
        />
        <div class="d-flex flex-row">
            <div class="audio-btn-ctn" @click="onClickMove(-1)">
                <img
                    src="@/assets/icons/previous.png"
                    alt=""
                    class="audio-btn"
                />
            </div>
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
            <div class="audio-btn-ctn" @click="onClickMove(1)">
                <img src="@/assets/icons/next.png" alt="" class="audio-btn" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.podcast-content {
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 30px 0 30px;
}
.podcast-img {
    max-width: 200px;
    width: 40%;
    border-radius: 8px;
}
.audio-btn-ctn {
    margin: 0 8px;
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
.audio {
    width: 100%;
    max-width: 350px;
}

@media (max-width: 1200px) {
    .podcast-img {
        width: 25%;
    }
}
@media (max-width: 1000px) {
    .podcast-img {
        width: 20%;
        margin-bottom: 12px !important;
    }
}
@media (max-width: 520px) {
    .podcast-img {
        width: 50%;
    }
}

/* audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display, */
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

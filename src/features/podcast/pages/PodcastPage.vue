<script setup lang="ts">
import { PageName } from '@/common/constants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfidePopup from '../components/ConfidePopup.vue';
import PodcastVue from '../components/Podcast.vue';
import { Podcast } from '../interfaces';

interface DisplayElement {
    name: string;
    id: number;
    isTopic: boolean;
}

const bgs = [
    new URL('@/assets/images/podcast-board-0.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-2.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
    new URL('@/assets/images/podcast-board-1.png', import.meta.url).href,
];
const topics = [
    {
        id: 0,
        name: 'Yêu thương bao la',
        watched: false,
        podcasts: [
            {
                name: 'Sự trả ơn của Hổ trắng',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/0-0-su-tra-on-cua-ho-trang.m4a',
                    import.meta.url
                ).href,
            },
            {
                name: 'Văn học: Tên podcast ở đây',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL('@/assets/audio/podcast.mp3', import.meta.url)
                    .href,
            },
            {
                name: 'Tâm sự: Tên podcast ở đây',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL('@/assets/audio/podcast.mp3', import.meta.url)
                    .href,
            },
        ],
    },
    {
        id: 1,
        name: 'Thành thật là vàng',
        watched: false,
        podcasts: [
            {
                name: 'Bố mẹ đã "cưa đổ" tớ',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/1-0-bo-me-da-cua-do-to.m4a',
                    import.meta.url
                ).href,
            },
            {
                name: 'Văn học: Tên podcast ở đây',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL('@/assets/audio/podcast.mp3', import.meta.url)
                    .href,
            },
            {
                name: 'Tâm sự: Tên podcast ở đây',
                image: new URL('@/assets/images/topic.png', import.meta.url)
                    .href,
                sound: new URL('@/assets/audio/podcast.mp3', import.meta.url)
                    .href,
            },
        ],
    },
    {
        id: 2,
        name: 'Siêng học siêng làm',
        watched: false,
        podcasts: [],
        bg: 'images/bg1.png',
    },
    {
        id: 3,
        name: 'Cùng nhau đoàn kết',
        watched: false,
        podcasts: [],
        bg: 'images/bg2.png',
    },
    {
        id: 4,
        name: 'Dấu ấn quê hương',
        watched: false,
        podcasts: [],
        bg: 'images/bg3.png',
    },
    {
        id: 5,
        name: 'Nơi tình yêu đong đầy',
        watched: false,
        podcasts: [],
        bg: 'images/bg1.png',
    },
    {
        id: 6,
        name: 'Những người quả cảm',
        watched: false,
        podcasts: [],
        bg: 'images/bg2.png',
    },
    {
        id: 7,
        name: 'Thế giới diệu kì',
        watched: false,
        podcasts: [],
        bg: 'images/bg3.png',
    },
    {
        id: 8,
        name: 'Tình yêu cuộc sống',
        watched: false,
        podcasts: [],
        bg: 'images/bg1.png',
    },
];

const router = useRouter();

const selectedTopic = ref();
const openPodcast = ref<Podcast>();
const allowGame = ref(false);
const confideEnable = ref(true);
const bgBoard = ref(0);

const getDisplayList = (): DisplayElement[] => {
    if (!selectedTopic.value) {
        return topics.map((topic) => ({
            name: topic.name,
            id: topic.id,
            isTopic: true,
        }));
    } else {
        const topicIndex = topics.findIndex(
            (topic) => topic.id === selectedTopic.value.id
        );
        return topics
            .slice(0, topicIndex + 1)
            .map((topic) => ({ name: topic.name, id: topic.id, isTopic: true }))
            .concat(
                topics[topicIndex].podcasts.map((podcast, index) => ({
                    name: podcast.name,
                    id: index,
                    isTopic: false,
                }))
            )
            .concat(
                topics.slice(topicIndex + 1, topics.length).map((topic) => ({
                    name: topic.name,
                    id: topic.id,
                    isTopic: true,
                }))
            );
    }
};

const onClickTopic = (selectedTopicId: number) => {
    const topicIndex = topics.findIndex(
        (topic) => topic.id === selectedTopicId
    );
    selectedTopic.value = topics[topicIndex];
    bgBoard.value = selectedTopicId;
    if (selectedTopic.value.bg) {
        document.getElementsByTagName(
            'body'
        )[0].style.backgroundImage = `url("${selectedTopic.value.bg}")`;
    } else {
        document.getElementsByTagName(
            'body'
        )[0].style.backgroundImage = `url("images/bg.png")`;
    }
};
const onClickPodcast = (selectedPodcastId: number) => {
    openPodcast.value = null as any;
    openPodcast.value = selectedTopic.value.podcasts[selectedPodcastId];
};
const onEnded = () => {
    allowGame.value = true;
    confideEnable.value = true;
};
const onSendConfide = () => {
    confideEnable.value = false;
};
const onGotoGame = () => {
    if (
        allowGame.value ||
        (selectedTopic.value.id === 0 &&
            openPodcast.value?.name === selectedTopic.value.podcasts[0].name)
    ) {
        allowGame.value = false;
        router.push({ name: PageName.GAME_PAGE });
    }
};
</script>

<template>
    <div class="d-flex flex-row align-items-start container">
        <div class="col-md-3 topics">
            <div
                class="mb-2"
                style="
                    text-align: center;
                    background-color: chocolate;
                    color: white;
                    font-weight: 700;
                    border-radius: 12px;
                    font-size: 24px;
                "
            >
                Chủ điểm
            </div>
            <el-scrollbar style="height: calc(100% - 36px - 8px)">
                <div v-for="(topic, index) in getDisplayList()" :key="index">
                    <div
                        v-if="(topic as DisplayElement).isTopic"
                        @click="onClickTopic((topic as DisplayElement).id)"
                        class="d-flex flex-row align-items-center mb-1 topic justify-content-start"
                    >
                        <img
                            src="@/assets/images/topic.png"
                            alt=""
                            class="topic-img"
                        />
                        {{ (topic as DisplayElement).name }}
                    </div>
                    <div
                        v-else
                        @click="onClickPodcast((topic as DisplayElement).id)"
                        class="d-flex flex-row align-items-center mb-1 podcast-item justify-content-start"
                    >
                        <img
                            src="@/assets/images/topic.png"
                            alt=""
                            class="topic-img"
                        />
                        {{ (topic as DisplayElement).name }}
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <div class="col-md-8 podcast position-relative">
            <div>
                <img
                    v-if="!selectedTopic?.bg"
                    :src="bgs[bgBoard]"
                    alt=""
                    class="podcast-bg"
                />
            </div>
            <PodcastVue
                v-if="openPodcast"
                :key="openPodcast.name"
                :topicName="selectedTopic.name"
                :podcast="openPodcast"
                @ended="onEnded"
            />
            <el-tooltip
                effect="light"
                placement="top"
                :content="
                    allowGame
                        ? 'Đến khu vườn'
                        : 'Bạn phải nghe hết podcast trước'
                "
            >
                <div class="goto-game-btn position-absolute">
                    <a @click="onGotoGame" style="border-radius: 50%">
                        <img
                            src="@/assets/images/go-to-game.png"
                            alt=""
                            class="goto-game-img"
                        />
                    </a>
                </div>
            </el-tooltip>
        </div>
    </div>
    <ConfidePopup :enable="confideEnable" @send="onSendConfide" />
</template>

<style scoped>
.container {
    max-width: 1200px;
    width: 80%;
}
.topics {
    padding: 8px;
    background-color: darkred;
    margin-right: 12px;
    height: 70vh;
}
.topic {
    padding: 8px;
    border-radius: 12px;
    background-color: white;
    text-align: left;
    cursor: pointer;
    user-select: none;
}
.podcast {
    height: 100%;
}
.podcast > div {
    height: 100%;
}
.podcast-item {
    margin: 0 8px;
    padding: 8px;
    border-radius: 12px;
    background-color: aqua;
    text-align: left;
    cursor: pointer;
    user-select: none;
}
.topic-img {
    margin-right: 8px;
    width: 36px;
    height: 36px;
    border-radius: 6px;
}
.podcast-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
.goto-game-btn {
    top: 0;
    right: 0;
    width: 120px;
    border-radius: 50%;
    cursor: pointer;
    height: auto !important;
}
.goto-game-btn:hover {
    box-shadow: 0 0 10px 0px white;
}
.goto-game-img {
    width: 100%;
}

@media (max-width: 900px) {
    .goto-game-btn {
        width: 80px;
    }
}
@media (max-width: 520px) {
    .container {
        margin-top: 40px;
        margin-bottom: 80px;
    }
    .topics {
        height: 300px;
    }
    .podcast {
        margin-top: 12px;
        height: 450px !important;
        padding: 0;
    }
    .goto-game-btn {
        position: fixed !important;
        width: 50px;
        bottom: 32px;
        left: 16px;
    }
}
</style>

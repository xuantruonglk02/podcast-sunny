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
    image?: string;
    title?: string;
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
                id: 0,
                title: 'Truyện số 1',
                name: 'Sự trả ơn của Hổ trắng',
                image: new URL('@/assets/images/topic-0.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/0-0-su-tra-on-cua-ho-trang.m4a',
                    import.meta.url
                ).href,
            },
            {
                id: 1,
                title: 'Truyện số 2',
                name: 'Sự tích quả bầu tiên',
                image: new URL('@/assets/images/topic-1.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/0-1-su-tich-qua-bau-tien.mp4',
                    import.meta.url
                ).href,
            },
            {
                id: 2,
                title: 'Tâm sự cùng bạn',
                name: 'Tình bạn diệu kỳ',
                image: new URL('@/assets/images/topic-2.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/0-2-tinh-ban-dieu-ky.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg2.png',
    },
    {
        id: 1,
        name: 'Thành thật là vàng',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Câu chuyện cậu bé Pinocchico',
                image: new URL('@/assets/images/topic-3.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/1-0-cau-chuyen-cau-be-pinocchico.mp4',
                    import.meta.url
                ).href,
            },
        ],
    },
    {
        id: 2,
        name: 'Siêng học siêng làm',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Ve sầu và kiến',
                image: new URL('@/assets/images/topic-4.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/2-0-ve-sau-va-kien.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg1.png',
    },
    {
        id: 3,
        name: 'Cùng nhau đoàn kết',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Người thợ săn và những chú chim bồ câu',
                image: new URL('@/assets/images/topic-5.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/3-0-nguoi-tho-san-va-nhung-chu-chim-bo-cau.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg2.png',
    },
    {
        id: 4,
        name: 'Dấu ấn quê hương',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Bố mẹ đã "cưa đổ" tớ',
                image: new URL('@/assets/images/topic-6.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/4-0-bo-me-da-cua-do-to.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg3.png',
    },
    {
        id: 5,
        name: 'Nơi tình yêu đong đầy',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Bàn chân ông nội',
                image: new URL('@/assets/images/topic-7.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/5-0-ban-chan-ong-noi.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg1.png',
    },
    {
        id: 6,
        name: 'Những người quả cảm',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Câu chuyện Đam bơ ri',
                image: new URL('@/assets/images/topic-8.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/6-0-cau-chuyen-dam-bo-ri.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg2.png',
    },
    {
        id: 7,
        name: 'Thế giới diệu kì',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Vùng tây Ra đi oo',
                image: new URL('@/assets/images/topic-9.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/7-0-vung-tay-ra-di-o.mp4',
                    import.meta.url
                ).href,
            },
        ],
        bg: 'images/bg3.png',
    },
    {
        id: 8,
        name: 'Tình yêu cuộc sống',
        watched: false,
        podcasts: [
            {
                id: 0,
                title: 'Truyện số 1',
                name: 'Chiếc lá cuối cùng',
                image: new URL('@/assets/images/topic-10.png', import.meta.url)
                    .href,
                sound: new URL(
                    '@/assets/audio/8-0-chiec-la-cuoi-cung.mp4',
                    import.meta.url
                ).href,
            },
        ],
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
                    image: podcast.image,
                    title: podcast.title,
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
    openPodcast.value = selectedTopic.value.podcasts[selectedPodcastId];
};
const onMovePre = () => {
    if (openPodcast.value?.id === 0) {
        if (selectedTopic.value.id === 0) {
            return;
        } else {
            onClickTopic(selectedTopic.value.id - 1);
            onClickPodcast(selectedTopic.value.podcasts.length - 1);
        }
    } else {
        onClickPodcast((openPodcast.value?.id as number) - 1);
    }
};
const onMoveNext = () => {
    if (openPodcast.value?.id === selectedTopic.value.podcasts.length - 1) {
        if (selectedTopic.value.id === topics.length - 1) {
            return;
        } else {
            onClickTopic(selectedTopic.value.id + 1);
            onClickPodcast(0);
        }
    } else {
        onClickPodcast((openPodcast.value?.id as number) + 1);
    }
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
                        {{ (topic as DisplayElement).name }}
                    </div>
                    <div
                        v-else
                        @click="onClickPodcast((topic as DisplayElement).id)"
                        class="d-flex flex-row align-items-center mb-1 podcast-item justify-content-start"
                    >
                        <img :src="topic.image" alt="" class="topic-img" />
                        {{ (topic as DisplayElement).title }}
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <div class="col-8 podcast position-relative">
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
                @pre="onMovePre"
                @next="onMoveNext"
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
@media (max-width: 1000px) {
    .goto-game-btn {
        position: fixed !important;
        width: 100px;
        top: 12px;
        right: 12px;
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
}
</style>

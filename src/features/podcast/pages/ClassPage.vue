<script setup lang="ts">
import { PageName } from '@/common/constants';
import { computed, onMounted, ref } from 'vue';

const chooseClass = ref(null);
const classLeft = ref(null);
const classRight = ref(null);
const windowWidth = ref(0);

onMounted(() => {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    });
});
</script>

<template>
    <div class="container">
        <div class="d-flex flex-row align-items-end justify-content-center ctn">
            <div class="choose-class-ctn">
                <img
                    v-if="windowWidth > 430"
                    src="@/assets/images/choose-class.png"
                    alt=""
                    class="choose-class"
                />
                <img
                    v-else
                    src="@/assets/images/choose-class-m.png"
                    alt=""
                    class="choose-class"
                />
            </div>
            <div class="d-flex flex-row class-group">
                <div class="position-relative">
                    <img
                        v-if="windowWidth > 430"
                        src="@/assets/images/class-board.png"
                        alt=""
                        class="class-board"
                    />
                    <img
                        v-else
                        src="@/assets/images/class-board-mr.png"
                        alt=""
                        class="class-board"
                    />
                    <div class="position-absolute class-text-ctn">
                        <router-link
                            :to="{ name: PageName.PODCAST_PAGE }"
                            class="class"
                            ><div>Lớp 4</div></router-link
                        >
                    </div>
                </div>
                <div class="position-relative">
                    <img
                        v-if="windowWidth > 430"
                        src="@/assets/images/class-board-lock.png"
                        alt=""
                        class="class-board"
                    />
                    <img
                        v-else
                        src="@/assets/images/class-board-ml-lock.png"
                        alt=""
                        class="class-board"
                    />
                    <div class="position-absolute class-text-ctn">
                        <router-link
                            :to="{ name: PageName.PODCAST_PAGE }"
                            class="class locked"
                            ><div>Lớp 5</div></router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.choose-class-ctn {
    margin-right: 40px;
}
.class-text-ctn {
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    padding-top: 15%;
}
.choose-class {
    width: 400px;
}
.class {
    text-decoration: none;
    color: white;
    cursor: pointer;
    font-size: 36px;
}
.locked {
    cursor: default !important;
    pointer-events: none;
}
.class-board {
    width: 250px;
}
.class-group > div {
    margin-left: 40px;
}

@media (max-width: 1100px) {
    .choose-class-ctn {
        margin-right: 0;
    }
    .choose-class {
        width: 300px;
    }
    .class-board {
        width: 180px;
    }
    .class {
        font-size: 22px;
    }
}
@media (max-width: 760px) {
    .choose-class {
        width: 100%;
    }
    .class-board {
        width: 100%;
    }
    .class-group > div {
        margin-left: 10px;
    }
}
@media (max-width: 500px) {
    .class {
        font-size: 18px;
    }
}
@media (max-width: 430px) {
    .ctn,
    .class-group {
        flex-direction: column !important;
    }
    .class-group {
        width: 100%;
    }
    .class-group > div {
        width: 200px;
        margin-left: 0;
        margin-top: 30px;
    }
    .class-group > div:first-of-type {
        margin-left: auto;
    }
    .choose-class-ctn {
        width: 50%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .class-board {
        width: 100%;
    }
    .class {
        font-size: 170%;
    }
    .class-text-ctn {
        padding-top: 25%;
    }
}
</style>

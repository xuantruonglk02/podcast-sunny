<script setup lang="ts">
import { PageName } from '@/common/constants';
</script>

<template>
    <div class="container">
        <div class="d-flex flex-row align-items-end justify-content-center">
            <div style="margin-right: 40px">
                <img
                    src="@/assets/images/choose-class.png"
                    alt=""
                    style="width: 400px"
                />
            </div>
            <div class="d-flex flex-row class-group">
                <div class="position-relative">
                    <img
                        src="@/assets/images/class-board.png"
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
                        src="@/assets/images/class-board-lock.png"
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
.class-text-ctn {
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    padding-top: 20%;
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
</style>

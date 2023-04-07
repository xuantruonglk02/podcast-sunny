<script setup lang="ts">
import { ref } from 'vue';
import { Promotion } from '@element-plus/icons-vue';

withDefaults(defineProps<{ enable: boolean }>(), {
    enable: false,
});
const emit = defineEmits(['send']);

const textarea = ref('');

const onSend = () => {
    textarea.value = '';
    emit('send');
};
</script>

<template>
    <div class="position-absolute share-ctn">
        <el-popover placement="top" :width="300" trigger="click">
            <template #reference>
                <img src="@/assets/images/tamsu.png" alt="" class="share-img" />
            </template>
            <div v-if="enable" class="d-flex flex-row align-items-end">
                <el-input
                    v-model="textarea"
                    :rows="4"
                    type="textarea"
                ></el-input>
                <div class="send-btn-ctn" @click="onSend">
                    <Promotion class="send-btn" />
                </div>
            </div>
            <div v-else class="text-center">Bạn vẫn chưa nghe xong podcast</div>
        </el-popover>
    </div>
</template>

<style scoped>
.share-ctn {
    width: 240px;
    bottom: 30px;
    right: 30px;
}
.share-img {
    width: 100%;
}
.send-btn-ctn {
    border-radius: 50%;
    cursor: pointer;
    padding: 8px;
    margin-left: 8px;
}
.send-btn-ctn:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
.send-btn {
    width: 24px;
    height: 24px;
}
</style>

import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const logged: Ref<boolean> = ref(false);

    const setLogged = (value: boolean) => {
        logged.value = value;
    };

    return { logged, setLogged };
});

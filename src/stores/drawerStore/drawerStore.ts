import { defineStore } from 'pinia'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
    const currentDrawerId = ref<DrawerIds | null>(null)
    const drawerOpen = ref<boolean>(false)
    const openDrawer = (drawerId: DrawerIds) => {
        currentDrawerId.value = drawerId
        drawerOpen.value = true
    }
    const closeDrawer = () => {
        currentDrawerId.value = null
        drawerOpen.value = false
    }
    return {
        currentDrawerId,
        drawerOpen,
        openDrawer,
        closeDrawer
    }
})
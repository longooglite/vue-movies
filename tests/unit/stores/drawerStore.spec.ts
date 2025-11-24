import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDrawerStore } from '@/stores/drawerStore/drawerStore'
import { DrawerIds } from '@/types/providers/DrawerProvider'

describe('drawerStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('openDrawer sets currentDrawerId and opens the drawer', () => {
    const store = useDrawerStore()
    store.openDrawer(DrawerIds.NAVIGATION)
    expect(store.currentDrawerId).toBe(DrawerIds.NAVIGATION)
    expect(store.drawerOpen).toBe(true)
  })
  it('closeDrawer clears currentDrawerId and closes the drawer', () => {
    const store = useDrawerStore()
    store.openDrawer(DrawerIds.EDIT_MOVIE)
    store.closeDrawer()
    expect(store.currentDrawerId).toBeNull()
    expect(store.drawerOpen).toBe(false)
  })
})



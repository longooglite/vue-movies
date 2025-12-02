import type { InjectionKey, Ref } from 'vue'

export const screenSizeProviderKey = Symbol('screenSize') as InjectionKey<Ref<string>>
export enum ScreenSize {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}
export interface ScreenSizeProviderReturn {
  screenSize: Ref<ScreenSize>
}
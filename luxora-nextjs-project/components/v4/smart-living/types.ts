export interface SmartLivingState {
  light: boolean;
  curtain: boolean;
  tv: boolean;
  ac: boolean;
  security: boolean;
}

export type DeviceKey = keyof SmartLivingState;

export type SceneKey = 'morning' | 'work' | 'movie' | 'sleep';

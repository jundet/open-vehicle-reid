export interface User {
  [key: string]: any;
  /** Name for current user */
  name?: string;
  /** id for current user */
  id?: number;
  /** Avatar for current user */
  avatar?: string;
  /** Email for current user */
  email?: string;
}

export interface Layout {
  [key: string]: any;
  /** Whether to fold menu */
  collapsed: boolean;
  /** Current language */
  lang: string;
  /** Color weak */
  colorWeak: boolean;
}

export interface SettingsNotify {
  type: 'layout' | 'app' | 'user';
  /** Update `key` name, limited `layout` type */
  name?: string;
  value: any;
}


export interface LocaleMeta {
  code: string;
  label: string;
  flag: string;
  style?: string; // extra hint for the AI translator
}

export const locales: LocaleMeta[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇲🇽', style: 'Latin American Spanish (LATAM)' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', style: 'Brazilian Portuguese' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', style: 'Korean' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', style: 'Japanese' },
  { code: 'zh', label: '中文', flag: '🇨🇳', style: 'Simplified Mandarin Chinese' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', style: 'Dutch' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', style: 'German' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', style: 'French' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', style: 'Arabic (RTL)' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', style: 'Hindi (Devanagari)' },
];

export const rtlLocales = new Set(['ar']);

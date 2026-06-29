// 輕量 i18n 系統 ── 無外部依賴、用 React Context + localStorage。
//
// 用法：
//   import { useLocale, useT } from '../i18n';
//   const { locale, setLocale } = useLocale();
//   const t = useT();
//   t('cart.checkout');
//
// 文案存在 ./locales/<lang>.js，匯出單一 default 物件。
// 找不到 key 時 fallback 到中文版的 value（或回傳 key 本身）。
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import zhStrings from './locales/zh.js';
import enStrings from './locales/en.js';

const STRINGS = { zh: zhStrings, en: enStrings };
const STORAGE_KEY = 'gf_locale';
const DEFAULT_LOCALE = 'zh';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && STRINGS[saved]) return saved;
    } catch {
      // localStorage may be unavailable
    }
    // 2026-05 老闆娘決定 focus 中文版 ── 拿掉 navigator.language 自動偵測
    // 避免外國訪客被丟到半成品英文版。基建保留、未來完整補完再打開切換。
    return DEFAULT_LOCALE;
  });

  const setLocale = (next) => {
    if (!STRINGS[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    // Update html lang attribute for accessibility / SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'en' ? 'en' : 'zh-Hant';
    }
  };

  // Sync lang attribute on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'en' ? 'en' : 'zh-Hant';
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  return useContext(LocaleContext);
}

// useT returns a translator function. Nested keys use dot notation.
// Fallback chain: <locale> → zh → key itself
// eslint-disable-next-line react-refresh/only-export-components
export function useT() {
  const { locale } = useLocale();
  return (key) => {
    const path = key.split('.');
    const lookup = (obj) => {
      let cur = obj;
      for (const seg of path) {
        if (cur && typeof cur === 'object' && seg in cur) cur = cur[seg];
        else return undefined;
      }
      return typeof cur === 'string' ? cur : undefined;
    };
    return lookup(STRINGS[locale]) || lookup(STRINGS.zh) || key;
  };
}

// Helper for components that need to pick between two language-specific
// versions of an object (e.g. product or article translations).
// Returns the .en variant if locale is 'en' AND the variant exists; else
// returns the original object.
// eslint-disable-next-line react-refresh/only-export-components
export function useLocaleVariant(obj, enField = 'translations') {
  const { locale } = useLocale();
  if (locale === 'en' && obj && obj[enField] && obj[enField].en) {
    return { ...obj, ...obj[enField].en };
  }
  return obj;
}

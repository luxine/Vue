import { App } from 'vue';
import { createI18n, Composer } from 'vue-i18n';
import { Message } from './message';

type MessageSchema = {
  [locale: string]: Record<string, string | Record<string, string>>;
};
const modules = import.meta.glob<{ default: MessageSchema[string] }>('../assets/locales/*.json', {
  eager: true,
});

const messages: Record<string, Record<string, unknown>> = {};
for (const path in modules) {
  const matched = path.match(/\.\.\/assets\/locales\/(.*?)\.json$/);
  if (matched) {
    const locale = matched[1];
    messages[locale] = modules[path].default;
  }
}
const STORAGE_KEY = 'app-locale';
/* ---------- 2. 初始语言决策 ---------- */
function detectInitialLocale(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && messages[saved]) return saved;

  // 浏览器首选语言 → 'en-US' 截取前两位
  const browser = navigator.language.split('-')[0];
  if (messages[browser]) return browser;

  return 'en'; // DEFAULT_LOCALE
}

const DEFAULT_LOCALE = detectInitialLocale();
const FALLBACK_LOCALE = 'en';

const i18n = createI18n<MessageSchema, string, false>({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: messages as unknown as Record<string, MessageSchema>,
  globalInjection: true,
});

export type I18nComposer = Composer;
export function setupI18n(app: App) {
  app.use(i18n);
}

/* ---------- 5. 动态切换并持久化 ---------- */
export async function setLocale(lang: string) {
  const { global } = i18n;
  if (global.locale.value === lang) return;

  if (!global.availableLocales.includes(lang)) {
    try {
      const mod = await import(`../assets/locales/${lang}.json`);
      global.setLocaleMessage(lang, mod.default);
    } catch {
      Message.warning(`[i18n] The language pack was not found: ${lang}`);
      return;
    }
  }

  global.locale.value = lang;
  localStorage.setItem(STORAGE_KEY, lang); // *** 持久化 ***
}

export function getLocale() {
  return i18n.global.locale.value;
}

export function getAvailableLocales() {
  return i18n.global.availableLocales;
}

export default i18n;

import { useTranslation } from 'react-i18next';

export default function TranslationSwitcher() {

    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    function changeLanguage(lang: string) {
        if (lang === currentLang) return;
        i18n.changeLanguage(lang);
        document.body.dir = i18n.dir();
    }

    return (
        <div className="flex gap-2">
            <button className={currentLang === 'en' ? 'text-sm font-bold text-primary' : 'text-sm text-muted cursor-pointer'} onClick={() => changeLanguage('en')}>🇺🇸 EN</button>
            <span className="text-sm text-muted">|</span>
            <button className={currentLang === 'es' ? 'text-sm font-bold text-primary' : 'text-sm text-muted cursor-pointer'} onClick={() => changeLanguage('es')}>🇪🇸 ES</button>
        </div>
    )
}

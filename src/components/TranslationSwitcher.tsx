import { useTranslation } from 'react-i18next';

export default function TranslationSwitcher() {

    const { i18n } = useTranslation();

    function changeLanguage(lang: string) {
        i18n.changeLanguage(lang);
        document.body.dir = i18n.dir();
    }

    return (
        <div className="flex gap-2">
            <button className="text-sm text-muted cursor-pointer" onClick={() => changeLanguage('en')}>🇺🇸 EN</button>
            <span className="text-sm text-muted">|</span>
            <button className="text-sm text-muted cursor-pointer" onClick={() => changeLanguage('es')}>🇪🇸 ES</button>
        </div>
    )
}

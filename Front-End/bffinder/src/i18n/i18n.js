import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa tus archivos de traducción
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
    en: { translation: translationEN },
    es: { translation: translationES },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'es', // Idioma predeterminado
        fallbackLng: 'en', // Idioma por defecto en caso de no encontrar la traducción
        keySeparator: '.', // Separador para claves anidadas (puedes ajustar según tu estructura)
        interpolation: {
            escapeValue: false, // No necesitas escapar los valores traducidos
        },
    });

export default i18n;
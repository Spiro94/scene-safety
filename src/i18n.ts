import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      signIn: {
        title: 'Welcome Back',
        description: 'Sign in to continue to Scene Safety',
        button: 'Sign in',
        forgotPassword: 'Forgot Password?',
        emailAddress: 'Email Address',
        emailPlaceholder: 'you@example.com',
        password: 'Password',
        buttonLoading: 'Signing in...',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
      signUp: {
        title: 'Create your account',
        description: 'Start your journey to safer viewing',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        emailPlaceholder: 'you@example.com',
        password: 'Password',
        button: 'Sign up',
        buttonLoading: 'Signing up...',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        confirmPassword: 'Confirm Password',
        confirmPasswordRequired: 'Please confirm your password',
        confirmPasswordMismatch: 'Passwords do not match',
        alreadyHaveAccount: 'Already have an account?',
        signIn: 'Sign in',
      },
    },
  },
  es: {
    translation: {
      signIn: {
        title: 'Bienvenido de nuevo',
        description: 'Inicia sesión para continuar con Scene Safety',
        button: 'Iniciar sesión',
        forgotPassword: '¿Olvidaste tu contraseña?',
        emailAddress: 'Dirección de correo electrónico',
        emailPlaceholder: 'tú@ejemplo.com',
        password: 'Contraseña',
        buttonLoading: 'Iniciando sesión...',
        emailRequired: 'El correo electrónico es obligatorio',
        emailInvalid:
          'Por favor, introduce una dirección de correo electrónico válida',
        passwordRequired: 'La contraseña es obligatoria',
        noAccount: '¿No tienes una cuenta?',
        signUp: 'Regístrate',
      },
      signUp: {
        title: 'Crea tu cuenta',
        description: 'Comienza tu camino hacia una visualización más segura',
        firstName: 'Nombre',
        lastName: 'Apellido',
        emailAddress: 'Dirección de correo electrónico',
        emailPlaceholder: 'tú@ejemplo.com',
        password: 'Contraseña',
        button: 'Regístrate',
        buttonLoading: 'Registrando...',
        firstNameRequired: 'El nombre es obligatorio',
        lastNameRequired: 'El apellido es obligatorio',
        emailRequired: 'El correo electrónico es obligatorio',
        emailInvalid:
          'Por favor, introduce una dirección de correo electrónico válida',
        passwordRequired: 'La contraseña es obligatoria',
        confirmPassword: 'Confirmar contraseña',
        confirmPasswordRequired: 'Por favor, confirma tu contraseña',
        confirmPasswordMismatch: 'Las contraseñas no coinciden',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
        signIn: 'Iniciar sesión',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

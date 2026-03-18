import { ArrowRight, Mail, TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import Input from '../components/Input'
import LabeledInput from '../components/LabeledInput'
import { useAppDispatch } from '../hooks/useDispatch'
import { useEffect } from 'react'
import { clearError, signUpAsync } from '../store/slices/authSlice'
import { useAppSelector } from '../hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import TranslationSwitcher from '../components/TranslationSwitcher'

interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { error, loading, isAuthenticated } = useAppSelector((state) => state.auth)
    const redirectTo = (location.state as { from?: string } | null)?.from || '/app/search';
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>()

    useEffect(() => {
        if (isAuthenticated) navigate(redirectTo, { replace: true })
    }, [isAuthenticated, navigate, redirectTo])

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch])


    async function onSubmit(data: IFormInput) {
        console.log(`Submitting form with data:`, data)
        if (loading) return
        const result = await dispatch(
            signUpAsync({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            }),
        )
        if (signUpAsync.fulfilled.match(result)) {
            navigate(redirectTo, { replace: true })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="absolute top-4 right-4">
                <TranslationSwitcher />
            </div>
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">{t('signUp.title')}</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    {t('signUp.description')}
                </p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-4">
                        <div className='flex flex-col gap-1'>
                            <LabeledInput label={t('signUp.firstName')} placeholder={t('signUp.firstName')} {...register('firstName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                            {errors?.firstName?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {t('signUp.firstNameRequired')}</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <LabeledInput label={t('signUp.lastName')} placeholder={t('signUp.lastName')} {...register('lastName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                            {errors?.lastName?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {t('signUp.lastNameRequired')}</p>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <LabeledInput
                            label={t('signUp.emailAddress')}
                            placeholder={t('signUp.emailPlaceholder')}
                            prefixIcon={<Mail />}
                            inputMode='email'
                            {...register('email', {
                                required: t('signUp.emailRequired'),
                                maxLength: 50,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t('signUp.emailInvalid'),
                                },
                            })}
                        />
                        {errors?.email?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                        {errors?.email?.type === 'pattern' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                    </div>
                    <LabeledInput label={t('signUp.password')} placeholder="••••••••" type='password' {...register("password", { required: t('signUp.passwordRequired') })} />
                    <div>
                        <LabeledInput label={t('signUp.confirmPassword')} placeholder="••••••••" type='password' {...register("confirmPassword", {
                            required: t('signUp.confirmPasswordRequired'),
                            validate: (value, formValues) =>
                                value === formValues.password || t('signUp.confirmPasswordMismatch'),
                        })} />
                        {errors.confirmPassword && <p className='inline-flex gap-2 items-center text-sm text-accent-red'>{errors.confirmPassword.message}</p>}
                    </div>
                    {error && (
                        <p className='inline-flex gap-2 items-center text-sm text-accent-red'>
                            <TriangleAlert size={16} /> {error}
                        </p>
                    )}
                    <Input type="submit" value={loading ? t('signUp.buttonLoading') : t('signUp.button')} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">{t('signUp.alreadyHaveAccount')}</span>
                        <button type='button' onClick={() => navigate('/', { state: { from: redirectTo } })} className="text-accent-teal text-sm font-medium cursor-pointer">{t('signUp.signIn')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

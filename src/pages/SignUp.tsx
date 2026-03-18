import { ArrowRight, Bookmark, Eye, Mail, Shield, TriangleAlert, Users } from 'lucide-react'
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
        <div className="flex min-h-screen">
            {/* Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-15 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #1A2332 0%, #0F1117 50%, #162028 100%)' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-accent-teal flex items-center justify-center">
                        <Shield size={22} className="text-[#0F1117]" />
                    </div>
                    <span className="text-primary font-bold text-[22px]">SceneSafety</span>
                </div>

                <div className="flex flex-col gap-8">
                    <h2 className="text-primary font-bold text-[42px] leading-[1.15] -tracking-[1px]">
                        {t('signUp.brandingTitle')}
                    </h2>
                    <p className="text-secondary text-base leading-[1.6] max-w-[460px]">
                        {t('signUp.brandingDescription')}
                    </p>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-lg bg-accent-teal/10 flex items-center justify-center shrink-0">
                                <Eye size={18} className="text-accent-teal" />
                            </div>
                            <span className="text-secondary text-[15px]">{t('signUp.brandingFeature1')}</span>
                        </div>
                        <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0">
                                <Users size={18} className="text-accent-blue" />
                            </div>
                            <span className="text-secondary text-[15px]">{t('signUp.brandingFeature2')}</span>
                        </div>
                        <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-lg bg-accent-amber/10 flex items-center justify-center shrink-0">
                                <Bookmark size={18} className="text-accent-amber" />
                            </div>
                            <span className="text-secondary text-[15px]">{t('signUp.brandingFeature3')}</span>
                        </div>
                    </div>
                </div>

                <p className="text-muted text-[13px] font-medium">
                    {t('signUp.brandingFooter')}
                </p>
            </div>

            {/* Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-card px-4 py-8 lg:px-20 lg:py-15 relative">
                <div className="absolute top-4 right-4">
                    <TranslationSwitcher />
                </div>
                <div className="max-w-[400px] w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-primary font-bold text-[28px] -tracking-[0.5px]">{t('signUp.title')}</h1>
                        <p className="text-secondary text-[15px]">
                            {t('signUp.description')}
                        </p>
                    </div>
                    <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between gap-3.5">
                            <div className='flex flex-col gap-1 flex-1'>
                                <LabeledInput label={t('signUp.firstName')} placeholder={t('signUp.firstName')} {...register('firstName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                                {errors?.firstName?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {t('signUp.firstNameRequired')}</p>}
                            </div>
                            <div className='flex flex-col gap-1 flex-1'>
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
                        <Input type="submit" value={loading ? t('signUp.buttonLoading') : t('signUp.button')} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-4" />
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex-1 h-px bg-border"></div>
                            <span className="text-muted text-[13px]">or</span>
                            <div className="flex-1 h-px bg-border"></div>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" className="flex-1 h-11 rounded-lg bg-elevated border border-border flex items-center justify-center gap-2 text-primary text-sm font-medium cursor-pointer hover:bg-border/30 transition-colors">
                                Google
                            </button>
                            <button type="button" className="flex-1 h-11 rounded-lg bg-elevated border border-border flex items-center justify-center gap-2 text-primary text-sm font-medium cursor-pointer hover:bg-border/30 transition-colors">
                                Apple
                            </button>
                        </div>
                        <div className="flex gap-1 justify-center">
                            <span className="text-muted text-[13px]">{t('signUp.alreadyHaveAccount')}</span>
                            <button type='button' onClick={() => navigate('/', { state: { from: redirectTo } })} className="text-accent-teal text-[13px] font-semibold cursor-pointer">{t('signUp.signIn')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

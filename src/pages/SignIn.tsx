import { ArrowRight, Mail, ShieldCheck, TriangleAlert, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Input from "../components/Input";
import LabeledInput from "../components/LabeledInput";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useDispatch";
import { clearError, signInAsync } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";
import TranslationSwitcher from "../components/TranslationSwitcher";

interface IFormInput {
    email: string;
    password: string;
}

export default function SignIn() {
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
        if (loading) return
        const result = await dispatch(signInAsync({ email: data.email, password: data.password }))
        if (signInAsync.fulfilled.match(result)) {
            navigate(redirectTo, { replace: true })
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-card px-4 py-8 lg:px-20 lg:py-15 relative">
                <div className="absolute top-4 right-4 lg:right-auto lg:left-4">
                    <TranslationSwitcher />
                </div>
                <div className="max-w-100 w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-primary font-bold text-[28px] -tracking-[0.5px]">{t('signIn.title')}</h1>
                        <p className="text-secondary text-[15px]">
                            {t('signIn.description')}
                        </p>
                    </div>
                    <form className="flex flex-col gap-4.5" onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-1'>
                            <LabeledInput
                                label={t('signIn.emailAddress')}
                                placeholder={t('signIn.emailPlaceholder')}
                                prefixIcon={<Mail />}
                                inputMode='email'
                                {...register('email', {
                                    required: t('signIn.emailRequired'),
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: t('signIn.emailInvalid'),
                                    },
                                })}
                            />
                            {errors?.email?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                            {errors?.email?.type === 'pattern' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <LabeledInput
                                label={t('signIn.password')}
                                placeholder="••••••••"
                                type="password"
                                labelRight={<button type="button" className="text-accent-teal text-sm font-medium cursor-pointer">{t('signIn.forgotPassword')}</button>}
                                {...register("password", { required: t('signIn.passwordRequired') })}
                            />
                            {errors.password && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.password.message}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4.5 h-4.5 rounded border-[1.5px] border-border-light bg-input"></div>
                            <span className="text-secondary text-[13px]">Remember me</span>
                        </div>
                        {error && (
                            <p className='inline-flex gap-2 items-center text-sm text-accent-red'>
                                <TriangleAlert size={16} /> {error}
                            </p>
                        )}
                        <Input type="submit" value={loading ? t('signIn.buttonLoading') : t('signIn.button')} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-4" />
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
                            <span className="text-muted text-[13px]">{t('signIn.noAccount')}</span>
                            <button type="button" onClick={() => navigate('/sign_up', { state: { from: redirectTo } })} className="text-accent-teal text-[13px] font-semibold cursor-pointer">{t('signIn.signUp')}</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-15 relative overflow-hidden"
                style={{ background: 'linear-gradient(200deg, #1A2332 0%, #0F1117 50%, #162028 100%)' }}>
                <div className="flex flex-col gap-10 justify-center max-w-120">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-accent-teal flex items-center justify-center">
                            <ShieldCheck size={22} className="text-[#0F1117]" />
                        </div>
                        <span className="text-primary font-bold text-[22px]">SceneWatch</span>
                    </div>

                    <h2 className="text-primary font-bold text-[42px] leading-[1.15] -tracking-[1px] whitespace-pre-line">
                        {t('signIn.brandingTitle')}
                    </h2>

                    <div className="rounded-2xl bg-card border border-border p-7 flex flex-col gap-4">
                        <p className="text-secondary text-[15px] leading-[1.6]">
                            {t('signIn.brandingQuote')}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-accent-teal/10 flex items-center justify-center">
                                <User size={18} className="text-accent-teal" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-primary text-sm font-semibold">{t('signIn.brandingAuthorName')}</span>
                                <span className="text-muted text-xs">{t('signIn.brandingAuthorRole')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

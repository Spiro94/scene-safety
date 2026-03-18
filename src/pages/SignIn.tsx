import { ArrowRight, Mail, TriangleAlert } from "lucide-react";
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
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="absolute top-4 right-4">
                <TranslationSwitcher />
            </div>
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">{t('signIn.title')}</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    {t('signIn.description')}
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                    {error && (
                        <p className='inline-flex gap-2 items-center text-sm text-accent-red'>
                            <TriangleAlert size={16} /> {error}
                        </p>
                    )}
                    <Input type="submit" value={loading ? t('signIn.buttonLoading') : t('signIn.button')} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">{t('signIn.noAccount')}</span>
                        <button type="button" onClick={() => navigate('/sign_up', { state: { from: redirectTo } })} className="text-accent-teal text-sm font-medium cursor-pointer">{t('signIn.signUp')}</button>
                    </div>
                </form>
            </div>
        </div >
    );
}

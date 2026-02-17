import { ArrowRight, Mail, TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import Input from '../components/Input'
import LabeledInput from '../components/LabeledInput'
import { useAppDispatch } from '../hooks/useDispatch'
import { useEffect } from 'react'
import { clearError, signUpAsync } from '../store/slices/authSlice'
import { useAppSelector } from '../hooks/useAppSelector'

interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
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
        const result = await dispatch(signUpAsync({ email: data.email, password: data.password }))
        if (signUpAsync.fulfilled.match(result)) {
            navigate(redirectTo, { replace: true })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">Create your account</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    Start your journey to safer viewing
                </p>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-4">
                        <div className='flex flex-col gap-1'>
                            <LabeledInput label="First Name" placeholder="John" {...register('firstName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                            {errors?.firstName?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> This field is required</p>}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <LabeledInput label="Last Name" placeholder="Doe" {...register('lastName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                            {errors?.lastName?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> This field is required</p>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <LabeledInput
                            label="Email Address"
                            placeholder="you@example.com"
                            prefixIcon={<Mail />}
                            inputMode='email'
                            {...register('email', {
                                required: "This field is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                        />
                        {errors?.email?.type === 'required' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                        {errors?.email?.type === 'pattern' && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.email.message}</p>}
                    </div>
                    <LabeledInput label="Password" placeholder="••••••••" type='password' {...register("password", { required: "Password is required" })} />
                    <div>
                        <LabeledInput label="Confirm Password" placeholder="••••••••" type='password' {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.password || "Passwords do not match",
                        })} />
                        {errors.confirmPassword && <p className='inline-flex gap-2 items-center text-sm text-accent-red'>{errors.confirmPassword.message}</p>}
                    </div>
                    {error && (
                        <p className='inline-flex gap-2 items-center text-sm text-accent-red'>
                            <TriangleAlert size={16} /> {error}
                        </p>
                    )}
                    <Input type="submit" value={loading ? 'Creating account...' : 'Create account'} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Already have an account?</span>
                        <button type='button' onClick={() => navigate('/', { state: { from: redirectTo } })} className="text-accent-teal text-sm font-medium cursor-pointer">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import { ArrowRight, Mail, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import LabeledInput from "../components/LabeledInput";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useDispatch";
import { clearError, signInAsync } from "../store/slices/authSlice";

interface IFormInput {
    email: string;
    password: string;
}

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error, loading, isAuthenticated } = useAppSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>()

    useEffect(() => {
        if (isAuthenticated) navigate('/app/search')
    }, [isAuthenticated, navigate])

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch])


    async function onSubmit(data: IFormInput) {
        if (loading) return
        const result = await dispatch(signInAsync({ email: data.email, password: data.password }))
        if (signInAsync.fulfilled.match(result)) {
            navigate('/app/search')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">Welcome Back</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    Sign in to continue to Scene Safety
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="flex flex-col gap-1">
                        <LabeledInput
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            labelRight={<button type="button" className="text-accent-teal text-sm font-medium cursor-pointer">Forgot password?</button>}
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className='inline-flex gap-2 items-center text-sm text-accent-red'><TriangleAlert size={16}></TriangleAlert> {errors.password.message}</p>}
                    </div>
                    {error && (
                        <p className='inline-flex gap-2 items-center text-sm text-accent-red'>
                            <TriangleAlert size={16} /> {error}
                        </p>
                    )}
                    <Input type="submit" value={loading ? 'Authenticating...' : 'Sign In'} disabled={loading} prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Don't have an account?</span>
                        <button type="button" onClick={() => navigate('/sign_up')} className="text-accent-teal text-sm font-medium cursor-pointer">Sign up</button>
                    </div>
                </form>
            </div>
        </div >
    );
}

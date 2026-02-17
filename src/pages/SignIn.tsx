import type { FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import LabeledInput from "../components/LabeledInput";

export default function SignIn() {
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate('/app/search');
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">Welcome Back</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    Sign in to continue to Scene Safety
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <LabeledInput label="Email Address" placeholder="you@example.com" prefixIcon={<Mail />} inputMode="email" />
                    <LabeledInput
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                        labelRight={<button type="button" className="text-accent-teal text-sm font-medium cursor-pointer">Forgot password?</button>}
                    />
                    <Input type="submit" value="Sign in" prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Don't have an account?</span>
                        <button type="button" onClick={() => navigate('/sign_up')} className="text-accent-teal text-sm font-medium cursor-pointer">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

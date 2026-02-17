import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";

export default function SignIn() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">Welcome Back</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    Sign in to continue to Scene Safety
                </p>
                <div className="flex flex-col gap-4">
                    <LabeledInput label="Email Address" placeholder="you@example.com" prefixIcon={<Mail />} />
                    <LabeledInput
                        label="Password"
                        placeholder="******"
                        labelRight={<button className="text-accent-teal text-sm font-medium cursor-pointer">Forgot password?</button>}
                    />
                    <Button className="mt-8" onClick={() => navigate('/app/search')}>Sign in<ArrowRight size={18}></ArrowRight></Button>
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Don't have an account?</span>
                        <button onClick={() => navigate('/sign_up')} className="text-accent-teal text-sm font-medium cursor-pointer">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

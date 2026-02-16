import { ChevronRight, Mail } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function SignIn() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-primary font-bold text-xl">Welcome Back</h1>
                <p className="text-secondary text-sm mb-8">
                    Sign in to continue to Scene Safety
                </p>
                <div className="flex flex-col items-start gap-4">
                    <label className='text-secondary font-semibold text-sm'>Email Address</label>
                    <Input placeholder="you@example.com" prefixIcon={<Mail></Mail>} />
                </div>
                <div className="flex flex-col items-start gap-4 mt-8">
                    <label className='text-secondary font-semibold text-sm'>Password</label>
                    <Input placeholder="you@example.com" prefixIcon={<Mail></Mail>} />
                </div>
                <Button onClick={() => navigate('/app/search')}>Sign in<ChevronRight></ChevronRight></Button>
            </div>
        </div>
    );
}
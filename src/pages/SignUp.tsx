import { ArrowRight, Mail } from 'lucide-react'
import LabeledInput from '../components/LabeledInput'
import Button from '../components/Button'
import { useNavigate } from 'react-router'

export default function SignUp() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-primary font-bold text-2xl text-center">Create your account</h1>
                <p className="text-secondary text-sm text-center mt-2 mb-8">
                    Start your journey to safer viewing
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between gap-4">
                        <LabeledInput label="First Name" placeholder="John" />
                        <LabeledInput label="Last Name" placeholder="Doe" />
                    </div>
                    <LabeledInput label="Email Address" placeholder="you@example.com" prefixIcon={<Mail />} />
                    <LabeledInput label="Password" placeholder="••••••••" />
                    <LabeledInput label="Confirm Password" placeholder="••••••••" />
                    <Button className="mt-8" onClick={() => navigate('/app/search')}>Create account<ArrowRight size={18}></ArrowRight></Button>
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Already have an account?</span>
                        <button onClick={() => navigate('/')} className="text-accent-teal text-sm font-medium cursor-pointer">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

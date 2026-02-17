import { ArrowRight, Mail, TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Input from '../components/Input'
import LabeledInput from '../components/LabeledInput'

interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>()

    function onSubmit(data: IFormInput) {
        alert(JSON.stringify(data))
        // navigate('/app/search');
    }

    console.log(watch('firstName'));

    console.log(`errors ${errors}`);


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
                        <LabeledInput label="Last Name" placeholder="Doe" {...register('lastName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} />
                    </div>
                    <LabeledInput label="Email Address" placeholder="you@example.com" prefixIcon={<Mail />} inputMode='email' />
                    <LabeledInput label="Password" placeholder="••••••••" type='password' />
                    <LabeledInput label="Confirm Password" placeholder="••••••••" type='password' />
                    <Input type="submit" value="Create account" prefixIcon={<ArrowRight size={18} />} className="mt-8" />
                    <div className="inline-flex gap-2 mt-8">
                        <span className="text-muted text-sm">Already have an account?</span>
                        <button type='button' onClick={() => navigate('/')} className="text-accent-teal text-sm font-medium cursor-pointer">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleBack}
            className='inline-flex gap-4 text-secondary cursor-pointer items-center hover:text-primary transition duration-200 ease-in-out'
        >
            <ChevronLeft />
            Back
        </button>
    )
}

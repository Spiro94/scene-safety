import { Plus } from "lucide-react";
import Button from "../components/Button";

export default function Community() {
    return (
        <div className='px-16 py-8 text-primary mx-auto max-w-7xl'>
            <header className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Community Contributions</h1>
                    <p className="text-secondary">
                        Help others by tagging trigger content and sharing context.
                    </p>
                </div>
                <Button><Plus size={16} /> New Contribution</Button>
            </header>
        </div>
    )
}

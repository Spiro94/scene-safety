import { Brain, Clock4 } from 'lucide-react'
import type { TriggerReport } from '../models/triggerReport'
import { capitalize } from '../utils/helpers'

export type TriggerCardProps = {
    report: TriggerReport
}

export default function TriggerCard({ report: trigger }: TriggerCardProps) {
    return (
        <div className='flex flex-col gap-4 bg-card border-border border rounded-2xl p-5'>
            <div className='inline-flex gap-2 items-center'><Brain size={18} className='text-accent-amber'></Brain> {capitalize(trigger.trigger_type)}</div>
            {trigger.description && <p className='text-secondary text-sm'>{trigger.description}</p>}
            <div className='inline-flex gap-2 items-center text-muted text-sm'><Clock4 size={16}></Clock4><span>{trigger.start_time} - {trigger.end_time}</span></div>
        </div>
    )
}

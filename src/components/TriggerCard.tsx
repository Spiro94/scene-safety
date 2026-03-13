import { Brain, Clock4 } from 'lucide-react'
import type { TriggerReport } from '../models/triggerReport'
import { badgeStyles, capitalize } from '../utils/helpers'

export type TriggerCardProps = {
    report: TriggerReport
}

export default function TriggerCard({ report: trigger }: TriggerCardProps) {
    return (
        <div className='flex flex-col gap-4 bg-card border-border border rounded-2xl p-5'>
            <div className='flex justify-between gap-2'>

                <div className='inline-flex gap-2 items-center'><Brain size={18} className='text-accent-amber'>
                </Brain> {capitalize(trigger.trigger_type)}
                </div>
                <div className={`px-4 py-2 text-xs rounded-3xl font-semibold ${badgeStyles[trigger.calification]}`}>{capitalize(trigger.calification)}</div>
            </div>
            {trigger.description && <p className='text-secondary text-sm'>{trigger.description}</p>}
            <div className='inline-flex gap-2 items-center text-muted text-sm'><Clock4 size={16}></Clock4><span>{trigger.start_time} - {trigger.end_time}</span></div>
        </div>
    )
}

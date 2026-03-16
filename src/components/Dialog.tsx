import { Clock4, Send, ShieldAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSubmitTriggerReport } from '../hooks/useSubmitTriggerReport'
import { useUpdateTriggerReport } from '../hooks/useUpdateTriggerReport'
import { CALIFICATION_LIST, PHOBIA_LIST } from '../utils/constants'
import Button from './Button'
import Input from './Input'
import TimestampInput from './MaskedInput'
import type { Calification } from '../models/calification'
import type { FullTriggerReport } from '../models/triggerReport'
import { capitalize } from '../utils/helpers'

export type DialogProps = {
    movieId: string;
    ref?: React.Ref<HTMLDialogElement>,
    onClose: () => void;
    report?: FullTriggerReport;
}

export default function Dialog({ ref, movieId, onClose, report }: DialogProps) {
    const [triggerType, setTriggerType] = useState(report?.trigger_type ?? '');
    const [calification, setCalification] = useState(report?.calification ?? '');
    const [startTime, setStartTime] = useState(report?.start_time ?? '');
    const [endTime, setEndTime] = useState(report?.end_time ?? '');
    const [description, setDescription] = useState(report?.description ?? '');
    const [timestampError, setTimestampError] = useState('');

    useEffect(() => {
        setTriggerType(report?.trigger_type ?? '');
        setCalification(report?.calification ?? '');
        setStartTime(report?.start_time ?? '');
        setEndTime(report?.end_time ?? '');
        setDescription(report?.description ?? '');
        setTimestampError('');
    }, [report]);

    const isEditMode = !!report;
    const submitMutation = useSubmitTriggerReport();
    const updateMutation = useUpdateTriggerReport();
    const mutation = isEditMode ? updateMutation : submitMutation;

    function handleOnClose() {
        setTriggerType('');
        setCalification('');
        setStartTime('');
        setEndTime('');
        setDescription('');
        setTimestampError('');
        onClose();
    }

    function validateTimestamps(): boolean {
        const numStartTime = startTime.split(':').map(Number);
        const numEndTime = endTime.split(':').map(Number);
        if (numStartTime >= numEndTime) {
            setTimestampError('End time must be greater than start time');
            return false;
        }
        return true;
    }

    function handleOnSubmit() {
        if (mutation.isPending) return;
        if (!validateTimestamps()) return;

        const reportData = {
            tmdb_movie_id: movieId,
            trigger_type: triggerType,
            start_time: startTime,
            end_time: endTime,
            description: description || null,
            calification: calification as Calification,
        };

        if (isEditMode) {
            updateMutation.mutate(
                { reportId: report.id!, report: reportData },
                { onSuccess: () => handleOnClose() },
            );
        } else {
            submitMutation.mutate(reportData, { onSuccess: () => handleOnClose() });
        }
    }


    const hasFullTimestamp = (value: string) => /^\d{2}:\d{2}:\d{2}$/.test(value);
    const isSubmitDisabled = !triggerType || !hasFullTimestamp(startTime) || !hasFullTimestamp(endTime);

    return (

        <dialog ref={ref} className='bg-card rounded-2xl m-auto backdrop:bg-black/60 border border-border'>
            <div className='px-7 py-6'>
                <div className='inline-flex gap-3 items-center'><ShieldAlert className='text-accent-teal'></ShieldAlert> <h2 className='text-primary font-semibold text-xl'>{isEditMode ? 'Edit Report' : 'Report Trigger'}</h2></div>
            </div>
            <hr className='text-border'></hr>
            <form onSubmit={(event) => {
                event.preventDefault();
                handleOnSubmit();
            }}>
                <div className='flex flex-col gap-7 p-7'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='fear-select' className='text-secondary font-semibold text-sm'>Trigger Type</label>
                        <select id='fear-select' name='fears' value={triggerType} onChange={(e) => { setTriggerType(e.target.value) }} className='bg-input px-4 py-4 text-primary placeholder:text-muted rounded-xl text-sm border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0'>
                            <option value=''>Select a trigger type</option>
                            {
                                PHOBIA_LIST.map((phobia) => {
                                    return <option key={phobia.name} value={phobia.name.toLowerCase()}>{`${phobia.name} (${phobia.description})`}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='calification-select' className='text-secondary font-semibold text-sm'>Calification</label>
                        <select id='calification-select' name='calification' value={calification} onChange={(e) => { setCalification(e.target.value) }} className='bg-input px-4 py-4 text-primary placeholder:text-muted rounded-xl text-sm border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0'>
                            <option value=''>Select a calification</option>
                            {
                                CALIFICATION_LIST.map((cal) => {
                                    return <option key={cal} value={cal}>{capitalize(cal)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-secondary font-semibold text-sm'>Timestamp</label>
                        <div className='flex gap-4 items-center'>
                            <TimestampInput
                                value={startTime}
                                onChange={setStartTime}
                                prefixIcon={<Clock4 size={16}></Clock4>}
                            />
                            <span className='text-secondary font-light'>-</span>
                            <TimestampInput
                                value={endTime}
                                onChange={setEndTime}
                                prefixIcon={<Clock4 size={16}></Clock4>}
                            />
                        </div>
                        <p className='text-red-500 text-sm'>{timestampError}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between ">
                            <label className='text-secondary font-semibold text-sm'>Description</label>
                            <p className='text-xs text-muted'>Optional</p>
                        </div>
                        <Input
                            multiline={true}
                            placeholder='Describe what happens in the scene to help others prepare...'
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                            inputMode='text'
                        ></Input>
                    </div>
                </div>
                {mutation.isError && (
                    <p className='text-red-500 text-sm px-7'>Something went wrong. Please try again.</p>
                )}
                <div className='flex gap-4 px-7 p-5 justify-end'>

                    <Button type='secondary' onClick={handleOnClose}>Cancel</Button>
                    <Input type='submit' disabled={isSubmitDisabled || mutation.isPending} value={mutation.isPending ? (isEditMode ? 'Saving...' : 'Submitting...') : (isEditMode ? 'Save Changes' : 'Submit Report')} prefixIcon={<Send size={16}></Send>} />
                </div>
            </form>

        </dialog>

    )
}

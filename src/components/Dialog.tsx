import { Clock4, Send, ShieldAlert } from 'lucide-react'
import React, { useState } from 'react'
import Button from './Button'
import { PHOBIA_LIST } from '../utils/constants'
import Input from './Input'
import { useSubmitTriggerReport } from '../hooks/useSubmitTriggerReport'

export type DialogProps = {
    movieId: string;
    ref?: React.Ref<HTMLDialogElement>,
    onClose: () => void
}

export default function Dialog({ ref, movieId, onClose }: DialogProps) {
    const [triggerType, setTriggerType] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const mutation = useSubmitTriggerReport()

    const formatTimestamp = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 6);
        const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6)].filter(Boolean);
        return parts.join(':');
    };

    function handleOnClose() {
        setTriggerType('');
        setStartTime('');
        setEndTime('');
        onClose();
    }

    function handleOnSubmit() {
        mutation.mutate({
            tmdb_movie_id: movieId,
            trigger_type: triggerType,
            start_time: startTime,
            end_time: endTime,
            description: description || null,
        }, {
            onSuccess: () => handleOnClose(),
        })
    }

    const hasFullTimestamp = (value: string) => /^\d{2}:\d{2}:\d{2}$/.test(value);
    const isSubmitDisabled = !triggerType || !hasFullTimestamp(startTime) || !hasFullTimestamp(endTime);

    return (

        <dialog ref={ref} className='bg-card rounded-2xl m-auto backdrop:bg-black/60 border border-border'>
            <div className='px-7 py-6'>
                <div className='inline-flex gap-3 items-center'><ShieldAlert className='text-accent-teal'></ShieldAlert> <h2 className='text-primary font-semibold text-xl'>Report Trigger</h2></div>
            </div>
            <hr className='text-border'></hr>
            <div className='flex flex-col gap-7 p-7'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='fear-select' className='text-secondary font-semibold text-sm'>Trigger Type</label>
                    <select id='fear-select' name='fears' value={triggerType} onChange={(e) => { setTriggerType(e.target.value) }} className='bg-input px-4 py-4 text-muted rounded-xl text-sm border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0'>
                        <option value=''>Select a trigger type</option>
                        {
                            PHOBIA_LIST.map((phobia) => {
                                return <option key={phobia.name} value={phobia.name.toLowerCase()}>{`${phobia.name} (${phobia.description})`}</option>
                            })
                        }
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-secondary font-semibold text-sm'>Timestamp</label>
                    <div className='flex gap-4 items-center'>
                        <Input
                            prefixIcon={<Clock4 size={16}></Clock4>}
                            placeholder='00:00:00'
                            value={startTime}
                            onChange={(event) => setStartTime(formatTimestamp(event.target.value))}
                            maxLength={8}
                            inputMode='numeric'
                        ></Input>
                        <span className='text-secondary font-light'>-</span>
                        <Input
                            prefixIcon={<Clock4 size={16}></Clock4>}
                            placeholder='00:00:00'
                            value={endTime}
                            onChange={(event) => setEndTime(formatTimestamp(event.target.value))}
                            maxLength={8}
                            inputMode='numeric'
                        ></Input>
                    </div>
                    <p className='text-xs text-muted'>Enter the start and end time of the scene (HH:MM:SS)</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-between ">
                        <label className='text-secondary font-semibold text-sm'>Description</label>
                        <p className='text-xs text-muted'>Optional</p>
                    </div>
                    <Input multiline={true}
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
                <Button disabled={isSubmitDisabled || mutation.isPending} onClick={() => {
                    handleOnSubmit();
                }}><Send size={16}></Send> {mutation.isPending ? 'Submitting...' : 'Submit Report'}</Button>
            </div>
        </dialog>

    )
}

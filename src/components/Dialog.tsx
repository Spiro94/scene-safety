import { Clock4, Send, ShieldAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSubmitTriggerReport } from '../hooks/useSubmitTriggerReport'
import { useUpdateTriggerReport } from '../hooks/useUpdateTriggerReport'
import { CALIFICATION_LIST, PHOBIA_LIST } from '../utils/constants'
import Button from './Button'
import Input from './Input'
import TimestampInput from './MaskedInput'
import type { Calification } from '../models/calification'
import type { FullTriggerReport } from '../models/triggerReport'


export type DialogProps = {
    movieId: string;
    ref?: React.Ref<HTMLDialogElement>,
    onClose: () => void;
    report?: FullTriggerReport;
}

export default function Dialog({ ref, movieId, onClose, report }: DialogProps) {
    const { t } = useTranslation();
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
            setTimestampError(t('dialog.endTimeError'));
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
                <div className='inline-flex gap-3 items-center'><ShieldAlert className='text-accent-teal'></ShieldAlert> <h2 className='text-primary font-semibold text-xl'>{isEditMode ? t('dialog.editReport') : t('dialog.reportTrigger')}</h2></div>
            </div>
            <hr className='text-border'></hr>
            <form onSubmit={(event) => {
                event.preventDefault();
                handleOnSubmit();
            }}>
                <div className='flex flex-col gap-7 p-7'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='fear-select' className='text-secondary font-semibold text-sm'>{t('dialog.triggerType')}</label>
                        <select id='fear-select' name='fears' value={triggerType} onChange={(e) => { setTriggerType(e.target.value) }} className='bg-input px-4 py-4 text-primary placeholder:text-muted rounded-xl text-sm border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0'>
                            <option value=''>{t('dialog.selectTriggerType')}</option>
                            {
                                PHOBIA_LIST.map((phobia) => {
                                    const key = phobia.name.replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toLowerCase());
                                    return <option key={phobia.name} value={phobia.name.toLowerCase()}>{`${t(`phobias.${key}.name`)} (${t(`phobias.${key}.description`)})`}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='calification-select' className='text-secondary font-semibold text-sm'>{t('dialog.calification')}</label>
                        <select id='calification-select' name='calification' value={calification} onChange={(e) => { setCalification(e.target.value) }} className='bg-input px-4 py-4 text-primary placeholder:text-muted rounded-xl text-sm border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0'>
                            <option value=''>{t('dialog.selectCalification')}</option>
                            {
                                CALIFICATION_LIST.map((cal) => {
                                    return <option key={cal} value={cal}>{t(`califications.${cal}`)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-secondary font-semibold text-sm'>{t('dialog.timestamp')}</label>
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
                            <label className='text-secondary font-semibold text-sm'>{t('dialog.description')}</label>
                            <p className='text-xs text-muted'>{t('common.optional')}</p>
                        </div>
                        <Input
                            multiline={true}
                            placeholder={t('dialog.descriptionPlaceholder')}
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                            inputMode='text'
                        ></Input>
                    </div>
                </div>
                {mutation.isError && (
                    <p className='text-red-500 text-sm px-7'>{t('dialog.submitError')}</p>
                )}
                <div className='flex gap-4 px-7 p-5 justify-end'>

                    <Button type='secondary' onClick={handleOnClose}>{t('common.cancel')}</Button>
                    <Input type='submit' disabled={isSubmitDisabled || mutation.isPending} value={mutation.isPending ? (isEditMode ? t('dialog.saving') : t('dialog.submitting')) : (isEditMode ? t('dialog.saveChanges') : t('dialog.submitReport'))} prefixIcon={<Send size={16}></Send>} />
                </div>
            </form>

        </dialog>

    )
}

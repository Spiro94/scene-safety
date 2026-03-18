import React from 'react'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'

export type Props = {
    className?: string;
    ref?: React.Ref<HTMLDialogElement>;
    onClose?: () => void;
    onDelete?: () => void;
}

export default function DeleteReportDialog({ ref, onClose, onDelete }: Props) {
    const { t } = useTranslation();

    return (
        <Modal className='bg-card rounded-2xl m-auto backdrop:bg-black/60 border border-border px-7 py-6 text-primary' ref={ref} onClose={onClose}>
            <h2 className='text-xl font-semibold mb-4'>{t('deleteDialog.title')}</h2>
            <p className='mb-6'>{t('deleteDialog.confirmation')}</p>
            <div className='flex justify-end gap-4'>
                <button onClick={onClose} className='px-4 py-2 bg-bg-elevated rounded-lg text-primary cursor-pointer'>{t('common.cancel')}</button>
                <button onClick={onDelete} className='px-4 py-2 bg-accent-red rounded-lg text-white cursor-pointer'>{t('common.delete')}</button>
            </div>
        </Modal>
    )
}

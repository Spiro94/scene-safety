import { Brain, Clock4, Pencil, ThumbsDown, ThumbsUp, Trash2, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../hooks/useAppSelector'
import { useSubmitUserVote } from '../hooks/useSubmitUserVote'
import useUserProfile from '../hooks/useUserProfile'
import type { FullTriggerReportWithUserVote } from '../models/triggerReport'
import { badgeStyles, capitalize } from '../utils/helpers'
import DeleteReportDialog from './DeleteReportDialog'
import Dialog from './Dialog'
import { useRef } from 'react'
import { useDeleteReport } from '../hooks/useDeleteReport'

export type TriggerCardProps = {
    report: FullTriggerReportWithUserVote
}

export default function TriggerCard({ report: trigger }: TriggerCardProps) {
    const { t } = useTranslation();
    const { data, isPending, error } = useUserProfile(trigger.user_id);
    const authState = useAppSelector((state) => state.auth);
    const voteMutation = useSubmitUserVote();
    const deleteMutation = useDeleteReport();
    const deleteDialogRef = useRef<HTMLDialogElement>(null);
    const editDialogRef = useRef<HTMLDialogElement>(null);

    console.log('Trigger report with user vote:', trigger.user_vote);

    function handleVote(vote: number) {
        voteMutation.mutate({
            movie_id: trigger.tmdb_movie_id,
            report_id: trigger.id!!,
            vote: vote
        })
    }

    function handleDelete() {
        deleteMutation.mutate({ report_id: trigger.id!!, movie_id: trigger.tmdb_movie_id });
        deleteDialogRef.current?.close();
    }

    function handleOpenDelete() {
        if (deleteDialogRef.current) {
            deleteDialogRef.current.showModal();
        }
    }

    function handleCloseDelete() {
        if (deleteDialogRef.current) {
            deleteDialogRef.current.close();
        }
    }

    function handleOpenEdit() {
        editDialogRef.current?.showModal();
    }

    function handleCloseEdit() {
        editDialogRef.current?.close();
    }

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
            {
                isPending && <p>{t('triggerCard.loadingUser')}</p>
            }
            {
                error && <p className='text-accent-red'>{t('triggerCard.errorLoadingUser')}</p>
            }
            {
                data && <p className='flex gap-2 items-center text-sm text-muted'><User size={14} />{t('triggerCard.reportedBy')} <span className='text-secondary font-semibold'>{data.first_name} {data.last_name}</span></p>
            }
            <hr className='text-muted h-0.5 my-3' />
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    {authState.user?.id === trigger.user_id && (
                        <>
                            <button onClick={handleOpenEdit} className='inline-flex gap-2 items-center px-2 py-1 text-muted font-medium cursor-pointer'><Pencil size={14} /> {t('common.edit')}</button>
                            <button onClick={handleOpenDelete} className='inline-flex gap-2 items-center px-2 py-1 text-accent-red font-medium cursor-pointer'><Trash2 size={14} /> {t('common.delete')}</button>
                        </>
                    )}
                </div>
                <div className='flex gap-3'>
                    <button onClick={() => handleVote(1)} className={`inline-flex gap-1 items-center px-2 py-1 bg-bg-elevated rounded-lg cursor-pointer ${trigger.user_vote === 1 ? 'text-accent-teal' : 'text-muted'}`}><ThumbsUp size={14} />{trigger.helpful_votes}</button>
                    <button onClick={() => handleVote(-1)} className={`inline-flex gap-1 items-center px-2 py-1 bg-bg-elevated rounded-lg cursor-pointer ${trigger.user_vote === -1 ? 'text-accent-red' : 'text-muted'}`}><ThumbsDown size={14} />{trigger.not_helpful_votes}</button>
                </div>
            </div>
            <DeleteReportDialog ref={deleteDialogRef} onClose={handleCloseDelete} onDelete={handleDelete} />
            <Dialog ref={editDialogRef} movieId={String(trigger.tmdb_movie_id)} report={trigger} onClose={handleCloseEdit} />
        </div>
    )
}

import { ModalAnyContent } from 'src/components/modals/modal-any-content/modal-any-content'
import style from './style.module.css'

type TArtistInfoConfirmModal = {
  setOpenModal: (v: boolean) => void
}

export const ArtistInfoConfirmModal = ({ setOpenModal }: TArtistInfoConfirmModal) => {
  const onSaveChanges = () => {
    setOpenModal(false)
  }
  const onDenyChanges = () => {
    setOpenModal(false)
  }

  return (
    <ModalAnyContent onOverlayClick={() => setOpenModal(false)} overlayStyle={style.overlay}>
      <div className={style.overlayContent}>
        <span className={style.overlayTitle}>Did you want to save changes?</span>
        <div className={style.overlayButtonWrapper}>
          <div className={style.overlayButton} onClick={onDenyChanges}>
            CANCEL WITHOUT SAVING
          </div>
          <div className={style.overlayButton} onClick={onSaveChanges}>
            SAVE
          </div>
        </div>
      </div>
    </ModalAnyContent>
  )
}

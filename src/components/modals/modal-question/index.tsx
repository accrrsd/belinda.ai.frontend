import { useState } from 'react'
import { ReactComponent as XIcon } from 'src/images/Xicon.svg'
import { ReactComponent as QuestionIcon } from 'src/images/questionIcon.svg'
import { TPageOffset } from 'src/utils/types'
import { ModalCoords } from '../modal-coords'
import style from './modal-question.module.css'

export const ModalQuestion = () => {
  const [modalOffset, setModalOffset] = useState<null | TPageOffset>(null)
  const closeModal = () => setModalOffset(null)

  return (
    <div className={style.wrapper}>
      <div className={style.questionButton} onClick={(e) => setModalOffset({ top: e.pageY, left: e.pageX - 10 })}>
        <QuestionIcon className={style.questionIcon} />
      </div>
      {modalOffset && (
        <ModalCoords offset={modalOffset} onClick={closeModal}>
          <div className={style.modalWrapper}>
            <button className={style.closeModal} onClick={closeModal}>
              <XIcon />
            </button>
            <span className={style.modalMessage}>Indicate the amount you'd like to receive for a 7-day placement in your playlist.</span>
          </div>
        </ModalCoords>
      )}
    </div>
  )
}

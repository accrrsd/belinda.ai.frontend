import { createPortal } from 'react-dom'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import style from './modal-any-content.module.css'

const modalsContainer = document.querySelector('#modals')

type TModalProps = {
  children: React.ReactNode
  onOverlayClick: () => void
  wrapperStyle?: string
  overlayStyle?: string
  removeDefaultStyle?: boolean
  removeDefaultOverlayStyle?: boolean
}

export const ModalAnyContent = ({
  children,
  onOverlayClick,
  wrapperStyle,
  removeDefaultStyle,
  overlayStyle,
  removeDefaultOverlayStyle,
}: TModalProps) => {
  return createPortal(
    <>
      <div className={`${removeDefaultStyle ? '' : style.wrapper} ${wrapperStyle}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} {...{ overlayStyle, removeDefaultOverlayStyle }} />
    </>,
    modalsContainer!
  )
}

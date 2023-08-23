import style from './modal-overlay.module.css'

type TModalOverlay = {
  onClick: () => void
  overlayStyle?: string
  removeDefaultOverlayStyle?: boolean
}

export const ModalOverlay = ({ onClick, overlayStyle = style.overlayBackgroundStyle, removeDefaultOverlayStyle }: TModalOverlay) => {
  return <div className={`${removeDefaultOverlayStyle ? '' : style.overlay} ${overlayStyle}`} onClick={onClick}></div>
}

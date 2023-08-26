import { TModalOverlay } from 'src/utils/types'
import style from './modal-overlay.module.css'

export const ModalOverlay = ({ onClick, overlayStyle = style.overlayBackgroundStyle, removeDefaultOverlayStyle }: TModalOverlay) => {
  return <div className={`${removeDefaultOverlayStyle ? '' : style.overlay} ${overlayStyle}`} onClick={onClick}></div>
}

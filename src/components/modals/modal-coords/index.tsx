import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TModalOverlay, TPageOffset } from 'src/utils/types'
import { ModalOverlay } from '../modal-overlay/modal-overlay'
import style from './modal-coords.module.css'
const modalsContainer = document.querySelector('#modals')

type TTipModal = {
  offset: TPageOffset
  children: React.ReactNode
} & TModalOverlay

export const ModalCoords = ({ offset, children, onClick, overlayStyle = style.overlay, removeDefaultOverlayStyle }: TTipModal) => {
  const [size, setSize] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    setSize(ref.current.offsetHeight)
  }, [ref, offset, size])

  return createPortal(
    <>
      <div className={style.wrapper} style={{ top: offset.top - size, left: offset.left }}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      <ModalOverlay {...{ onClick, overlayStyle, removeDefaultOverlayStyle }} />
    </>,
    modalsContainer!
  )
}

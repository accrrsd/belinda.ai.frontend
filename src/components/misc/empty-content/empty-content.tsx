import style from './empty-content.module.css'

export const EmptyContent = ({ message, button }: { message: string; button: boolean }) => {
  return (
    <div className={style.wrapper}>
      {message && <span className="message"></span>}
      {button && <button></button>}
    </div>
  )
}

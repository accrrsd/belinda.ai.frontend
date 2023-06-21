import style from './notice.module.css'

type TNotice = {
  children: React.ReactNode
  generalStyle?: string
  additionalStyle?: string
}

export const Notice = ({ children, generalStyle, additionalStyle }: TNotice) => {
  return <div className={`${generalStyle ?? style.wrapper} ${additionalStyle ?? ''}`}>{children}</div>
}

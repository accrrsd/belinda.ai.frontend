import style from './style.module.css'

export default function TitlePageFeature() {
  return (
    <div className={style.wrapper}>
      <div className={style.leftSide}>
        <div className={style.content}>
          <h1 className={style.title}>Belinda.ai</h1>
          <h3 className={style.subtitle}>Helping musicians discover the best potential partner for expansion of the audience using AI</h3>
          <div className={style.chooseWrapper}>
            <button className={style.chooseButton}>I release music</button>
            <button className={style.chooseButton}>I own playlist</button>
          </div>
          <button className={style.submitButton}>Let’s begin</button>
        </div>
      </div>
      <div className={style.rightSide} />
    </div>
  )
}

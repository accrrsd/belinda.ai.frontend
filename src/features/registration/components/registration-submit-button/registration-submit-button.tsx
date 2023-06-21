import { SubmitButton } from '../../../../components/inputs/submit-button'
import { ReactComponent as SubmitArrow } from '../../../../images/Arrow.svg'
import style from './registration-submit-button.module.css'

type TRegistrationSubmitButton = {
  text?: string
} & React.HTMLProps<HTMLInputElement>

export const RegistrationSubmitButton = ({ text, ...rest }: TRegistrationSubmitButton) => {
  return (
    <div className={style.wrapper}>
      <SubmitButton {...rest}>
        <span className={style.submitText}>
          {text ?? (
            <>
              Next Step
              <SubmitArrow className={style.submitArrow} />
            </>
          )}
        </span>
      </SubmitButton>
    </div>
  )
}

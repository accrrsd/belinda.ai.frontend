import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as BackArrow } from 'src/images/BackArrow.svg'
import style from './style.module.css'
import { TArtistAddTrackStage1, TArtistAddTrackStage2 } from './types'

import { ArtistAddTrackStage1 } from './entities/stage1'
import { ArtistAddTrackStage2 } from './entities/stage2'

export const ArtistAddTrack = () => {
  const [stage, setStage] = useState<1 | 2>(1)

  const formHookStage1 = useForm<TArtistAddTrackStage1>({ mode: 'all' })
  const formHookStage2 = useForm<TArtistAddTrackStage2>({ mode: 'all' })

  const getContentByStage = () => {
    switch (stage) {
      case 1:
        return <ArtistAddTrackStage1 formHook={formHookStage1} onSubmit={(d) => setStage(2)} />
      case 2:
        return <ArtistAddTrackStage2 formHook={formHookStage2} onSubmit={(d) => {}} />
    }
  }

  return (
    <div className={style.content}>
      <div className={style.titleWrapper}>
        <span className={style.title}>Add track</span>
        <div className={style.stepWrapper}>
          {stage > 1 && <BackArrow className={style.backArrow} onClick={() => stage > 1 && setStage((prev) => (prev - 1) as 1 | 2)} />}
          <div className={style.subtitle}>Step {stage}</div>
        </div>
      </div>
      {getContentByStage()}
    </div>
  )
}

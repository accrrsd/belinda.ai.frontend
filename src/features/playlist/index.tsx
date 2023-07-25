import style from './style.module.css'
import { SubmitButton } from "../../components/inputs/submit-button";
import { useState, useEffect, Key } from "react";
import {getPlaylists} from "../../utils/api";
import {splitArr} from "../../utils/functions";
import testImage from '../../images/not-found-image.png'

export default function PlaylistFeature() {
    const [playlists, setPlaylists] = useState<any[]>([])
    useEffect(() => {
        getPlaylists().then((res) => {
            setPlaylists(splitArr(res, 6))

        })
    }, []);
    console.log(playlists)
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.heading}>
                    <h1 className={style.title}>Playlists that AI deemed relevant for your promotion</h1>
                    <p className={style.subtitle}>Choose a playlist you like and reach out to its curator</p>
                </div>
                <div className={style.grid}>
                    {Object.keys(playlists).map((key) => {
                        // @ts-ignore
                        return (
                            <div className={style.row} key={key}>
                                <ul className={style.list}>
                                    {playlists[Number(key)].map((el: {
                                        tracks_total: string;
                                        owner_display_name: string;
                                        name: string;
                                        images_url: string;
                                        id: Key | null | undefined; }) => {
                                        return (
                                            <li className={style.card} key={el.id}>
                                                {el.images_url ?
                                                    <img
                                                        className={style.image}
                                                        src={el.images_url}
                                                        alt='Картинка тест'
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null; // prevents looping
                                                            currentTarget.src= testImage;
                                                        }}
                                                    />
                                                    :
                                                    <img
                                                        className={style.image}
                                                        src={testImage}
                                                        alt='Картинка тест'
                                                    />
                                                }
                                                <div className={style.info}>
                                                    <div className={style.headline}>
                                                        <div className={style.type}>{el.owner_display_name}</div>
                                                        <h2 className={style.name}>{el.name}</h2>
                                                    </div>
                                                    <div className={style.about}>
                                                        <div className={style.aboutText}>
                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M7.99935 8.48438C7.26602 8.48438 6.66602 8.25104 6.19935 7.78438C5.73268 7.31771 5.49935 6.71771 5.49935 5.98438C5.49935 5.25104 5.73268 4.65104 6.19935 4.18438C6.66602 3.71771 7.26602 3.48438 7.99935 3.48438C8.73268 3.48438 9.33268 3.71771 9.79935 4.18438C10.266 4.65104 10.4993 5.25104 10.4993 5.98438C10.4993 6.71771 10.266 7.31771 9.79935 7.78438C9.33268 8.25104 8.73268 8.48438 7.99935 8.48438ZM2.66602 13.8344V12.2677C2.66602 11.8455 2.77157 11.4844 2.98268 11.1844C3.19379 10.8844 3.46602 10.6566 3.79935 10.501C4.54379 10.1677 5.25768 9.91771 5.94102 9.75104C6.62435 9.58438 7.31046 9.50104 7.99935 9.50104C8.68824 9.50104 9.37157 9.58715 10.0493 9.75938C10.7271 9.9316 11.4382 10.1788 12.1827 10.501C12.5271 10.6566 12.8049 10.8844 13.016 11.1844C13.2271 11.4844 13.3327 11.8455 13.3327 12.2677V13.8344H2.66602Z"
                                                                    fill="#737373"/>
                                                            </svg>
                                                            Listeners
                                                        </div>
                                                        <div className={style.aboutQty}>23 500</div>
                                                    </div>
                                                    <div className={style.about}>
                                                        <div className={style.aboutText}>
                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M6.55078 14.5C5.85078 14.5 5.25911 14.2583 4.77578 13.775C4.29245 13.2917 4.05078 12.7 4.05078 12C4.05078 11.3 4.29245 10.7083 4.77578 10.225C5.25911 9.74167 5.85078 9.5 6.55078 9.5C6.86189 9.5 7.14245 9.54444 7.39245 9.63333C7.64245 9.72222 7.86189 9.84444 8.05078 10V2.5H11.9508V4.75H9.05078V12C9.05078 12.7 8.80912 13.2917 8.32578 13.775C7.84245 14.2583 7.25078 14.5 6.55078 14.5Z"
                                                                    fill="#737373"/>
                                                            </svg>
                                                            Tracks
                                                        </div>
                                                        <div className={style.aboutQty}>{el.tracks_total}</div>
                                                    </div>
                                                    <SubmitButton additionalStyle={style.button}>Choose this</SubmitButton>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className={style.tooltip}>
                                    <div className={style.tooltipTitle}>That's why it suits you</div>
                                    <div className={style.tooltipText}>These playlists are recommended as they feature
                                        collaborations with JID and Logic
                                    </div>
                                </div>
                                </div>
                            )
                    })}
                </div>
            </div>
        </div>
    )
}
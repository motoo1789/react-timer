import {useContext, useEffect} from 'react'
import { TimeContext }  from '../../App'
  
type ShowTimerProps = {
  color : string;
}

export const ShowTimer = (props : ShowTimerProps) => {
    
    const {color} = props
    const {totalSeconds} = useContext(TimeContext)
    const minute = Math.floor(totalSeconds / 60);
    const second = totalSeconds % 60;
    const sumTime = minute * 60 + second;
    const showColor = {
      color,
    };
    
    return (
      <>
        <div className="flex justify-center items-center">
          <p>{`合計の秒数：${sumTime}`}</p>
          <p style={showColor} className="text-9xl">{`${minute} : ${second}`}</p>
        </div>
      </>
    );
  }
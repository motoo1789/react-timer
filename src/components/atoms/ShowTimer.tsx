import {useContext} from 'react'
import { TimeContext }  from '../../App'
  
export const ShowTimer = () => {
    
    const {minute, second} = useContext(TimeContext)
    const sumTime = minute * 60 + second;


    return (
      <>
        <div className="flex justify-center items-center">
            <p>{`合計の秒数：${sumTime}`}</p>
            <p className="text-9xl">{`${minute} : ${second}`}</p>
        </div>
      </>
    );
  }
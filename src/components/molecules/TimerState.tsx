import { Button } from '../atoms/Button';
import { useState, useContext, useEffect} from 'react';
import { TimeContext } from '../../App'; 

type TimerStateProps = {
  minute: number;
  second: number;
}

export const TimerState = (props:TimerStateProps) => {
  const { minute, second } = props;
  const [isRunning, setIsRunning] = useState(false);
  const { totalSeconds, setTotalSeconds } = useContext(TimeContext);
  let timer:ReturnType<typeof setTimeout> 

  const onClickStart = () => {
    console.log('start');
    setTotalSeconds(minute * 60 + second);
    // falseの場合trueにする
    setIsRunning(isRunning || true);  
  };
  const onClickStop = () => {
    console.log('stop');
    // trueの場合falseにする !isRunningでもいいが練習のため
    setIsRunning(isRunning && false);
  };

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        if(totalSeconds < 0) {
          setIsRunning(isRunning && false);
        }
        setTotalSeconds((prev: number) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      console.log("クリーンアップ");
      clearInterval(timer);
    }
  }, [isRunning, setTotalSeconds]);

  return (
    <>
      <div>
        <Button content={'start'} changeState={onClickStart} />
        <Button content={'stop'} changeState={onClickStop} />
      </div>
    </>
  );
};

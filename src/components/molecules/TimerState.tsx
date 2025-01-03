import { Button } from '../atoms/Button';
import { useState, useContext, useEffect} from 'react';
import { TimeContext } from '../../App'; 

type TimerStateProps = {
  minute: number;
  second: number;
  setShowTimerColor: React.Dispatch<React.SetStateAction<string>>;
}

export const TimerState = (props:TimerStateProps) => {
  const { minute, second, setShowTimerColor } = props;
  const [isRunning, setIsRunning] = useState(false);
  const { totalSeconds, setTotalSeconds } = useContext(TimeContext);
  let timer:ReturnType<typeof setTimeout> 

  const onClickStart = () => {
    console.log('start');
    setTotalSeconds(minute * 60 + second);
    // falseの場合trueにする
    setIsRunning(isRunning || true);
    setShowTimerColor("black");
  };
  const onClickStop = () => {
    console.log('stop');
    // trueの場合falseにする !isRunningでもいいが練習のため
    setIsRunning(isRunning && false);
    setShowTimerColor("black");
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
  }, [isRunning]);

  useEffect(() => {
    if(totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timer);
      setShowTimerColor("red");
    }
  }, [totalSeconds]);

  return (
    <>
      <div>
        <Button content={'start'} changeState={onClickStart} />
        <Button content={'stop'} changeState={onClickStop} />
      </div>
    </>
  );
};

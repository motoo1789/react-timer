import { Button } from "../atoms/Button";
import { useState, useContext, useEffect } from "react";
import { TimeContext } from "../../App";

type TimerStateProps = {
  minute: number;
  second: number;
  setShowTimerColor: React.Dispatch<React.SetStateAction<string>>;
};

export const TimerState = (props: TimerStateProps) => {
  const { minute, second, setShowTimerColor } = props;
  const [isRunning, setIsRunning] = useState(false);
  const { totalSeconds, setTotalSeconds } = useContext(TimeContext);
  let timer: ReturnType<typeof setTimeout>;

  const onClickStart = () => {
    if (totalSeconds === 0) {
      setTotalSeconds(minute * 60 + second);
    }
    setIsRunning(true);
    setShowTimerColor("black");
  };
  const onClickPause = () => {
    setIsRunning(false);
    clearInterval(timer);
    setShowTimerColor("black");
  };
  const onClickReset = () => {
    setIsRunning(false);
    setShowTimerColor("black");
    setTotalSeconds(0);
  };

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setTotalSeconds((prev: number) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      clearInterval(timer);
      setShowTimerColor("red");
    }
  }, [totalSeconds]);

  return (
    <>
      <div className="flex">
        <Button content={"start"} changeState={onClickStart} />
        <Button content={"stop"} changeState={onClickPause} />
        <Button content={"reset"} changeState={onClickReset} />
      </div>
    </>
  );
};

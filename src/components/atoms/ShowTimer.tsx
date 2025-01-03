import { useContext } from "react";
import { TimeContext } from "../../App";

type ShowTimerProps = {
  color: string;
};

export const ShowTimer = (props: ShowTimerProps) => {
  const { color } = props;
  const { totalSeconds } = useContext(TimeContext);
  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;
  const showColor = {
    color,
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <p style={showColor} className="text-9xl">
          {minute < 10 ? `0${minute}` : minute} :{" "}
          {second < 10 ? `0${second}` : second}
        </p>
      </div>
    </>
  );
};

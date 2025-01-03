import { TimePullDown } from "../atoms/TimePullDown";

export type TimerSelectProps = {
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  setSecond: React.Dispatch<React.SetStateAction<number>>;
};

export const TimeSelect = (props: TimerSelectProps) => {
  const { setMinute, setSecond } = props;

  // _現在の要素、i現在のインデックスから長さまで
  const MINUTES = Array.from({ length: 60 }, (_, i) => i);
  const SECONDS = Array.from({ length: 60 }, (_, i) => i);
  return (
    <>
      <div className="flex">
        {/* TODO: flexで丁寧に修正する*/}
        <TimePullDown selectNumbers={MINUTES} setTimer={setMinute} />
        <span style={{ margin: "0 10px" }}>:</span>
        <TimePullDown selectNumbers={SECONDS} setTimer={setSecond} />
      </div>
    </>
  );
};

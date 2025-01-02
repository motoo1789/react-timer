import { TimePullDown } from "../atoms/TimePullDown";


export const TimeSelect = () => {

    // _現在の要素、i現在のインデックスから長さまで
    const MINUTES = Array.from({length: 60}, (_, i) => i );
    const SECONDS = Array.from({length: 60}, (_, i) => i );
  return (
    <>
        <div>
            <TimePullDown selectNumbers={MINUTES}/>
            ：
            <TimePullDown selectNumbers={SECONDS}/>

        </div>
    </>
  );
};

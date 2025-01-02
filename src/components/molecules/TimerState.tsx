import { Button } from '../atoms/Button';

export const TimerState = () => {
  const onClickStart = () => {
    console.log('start');
  };
  const onClickStop = () => {
    console.log('stop');
  };

  return (
    <>
      <div>
        <Button content={'start'} changeState={onClickStart} />
        <Button content={'stop'} changeState={onClickStop} />
      </div>
    </>
  );
};

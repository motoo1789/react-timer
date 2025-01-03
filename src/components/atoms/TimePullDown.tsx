import { memo } from "react";

type PullDown = {
  selectNumbers: Array<number>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
};

export const TimePullDown = memo((props: PullDown) => {
  const { selectNumbers, setTimer } = props;
  const onChangeTimer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNumber = Number(event.target.value);
    setTimer(selectedNumber);
  };

  return (
    <>
      <select 
        name="example" 
        onChange={onChangeTimer}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {selectNumbers.map((number: number) => {
          return <option key={number}>{number}</option>;
        })}
      </select>
    </>
  );
});

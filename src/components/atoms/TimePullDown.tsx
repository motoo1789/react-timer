import { memo } from 'react';

type PullDown = {
    selectNumbers : Array<number>;
	setTimer : React.Dispatch<React.SetStateAction<number>>;
}


export const TimePullDown = memo((props : PullDown) => {
	console.log("TimePullDown render!!");

    const { selectNumbers, setTimer } = props

	const onChangeTimer = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedNumber = Number(event.target.value);
		console.log(selectedNumber)
		setTimer(selectedNumber);
	};

    return (
        <>
            <select name="example" onChange={onChangeTimer}>
                {selectNumbers.map((number : number) => {
                   return <option key={number}>{number}</option>
                })}
            </select>
        </>
    );
});
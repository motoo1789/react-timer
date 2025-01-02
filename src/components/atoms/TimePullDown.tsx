type PullDown = {
    selectNumbers : Array<number>;
}


export const TimePullDown = (props : PullDown) => {

    const { selectNumbers } = props
    return (
        <>
            <select name="example">
                {selectNumbers.map((number : number) => {
                   return <option key={number}>{number}</option>
                })}
            </select>
        </>
    )
}
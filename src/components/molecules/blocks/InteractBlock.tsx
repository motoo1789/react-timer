

type InteractBlock<T> = {
    [P in keyof T]?: T[P]
};

export const InteractBlock = () => {
    

    return (
        <div

            style={{
                transform: `translate3D(0px, 0px, 0)`,
                width: '150px',
                height: '75px',
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5'
            }}>
        </div>
    );
}


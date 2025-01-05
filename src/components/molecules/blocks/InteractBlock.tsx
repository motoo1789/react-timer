import { useInteractJS } from '../../../hooks'

export const InteractBlock = () => {
    const interact = useInteractJS()

    return (
        <div
            ref={interact.ref}
            style={{
                ...interact.style,
                border: '2px solid #0489B1',
                backgroundColor: '#A9D0F5'
            }}>
        </div>
    );
}


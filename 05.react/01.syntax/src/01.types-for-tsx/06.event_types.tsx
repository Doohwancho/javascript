import React from'react';

export default function CButton() {
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => console.log("Clicked!");

    return (
        <button onClick={handleClick}>
            Click Me!
        </button>
    );
}
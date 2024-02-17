import React from "react";

function Canvas(props) {
    return (
        <canvas ref={props.canvasRef} width="950vw" height='680vw'
            style={{
                backgroundColor:"black",
                // zIndex:"2"
            }}
        >
        </canvas>
    )
}
export default Canvas
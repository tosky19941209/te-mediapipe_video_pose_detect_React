import React, { useEffect, useRef, forwardRef } from "react";

const Canvas = forwardRef((props, ref) => {
    
    return (
        <canvas ref={ref} width="950vw" height='680vw'
            style={{
                // backgroundColor:"black",
                // zIndex:"2"
            }}
        >
        </canvas>
    )
})



export default Canvas;
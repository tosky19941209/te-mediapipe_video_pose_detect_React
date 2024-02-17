import React, { useEffect, useRef } from "react";

function Canvas(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        console.log("Props frame in Canvas:", props.frame);

        // ctx.drawImage(props.frame, 0, 0, canvas.width, canvas.height);
        const drawFrame = () => {
            ctx.drawImage(props.frame, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame)
        }

        if (props.frame) {
            drawFrame()
        }
    }, props.frame);

    return (
        <canvas
            ref={canvasRef}
            width={950}
            height={680}
            style={{
                backgroundColor: "black"
            }}
        ></canvas>
    );
}

export default Canvas;
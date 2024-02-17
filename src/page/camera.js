import React, { useRef, useState } from "react";
import Canvas from "../component/Canvas/Canvas";
import './Camera.css'
function Camera() {
    const [className_svg, setClassName_svg] = useState('svg_css')
    const [className_cambtn, setClassName_cambtn] = useState('btn_camera')
    const canvasRef = useRef(null)
    return (
        <div>
            <div className="d-flex" style={{
                width: "50vw",
                height: "35vw",
                marginTop: "2vw"
            }}>
                <Canvas></Canvas>
                <button className={className_cambtn} onClick={e => {
                    if (className_svg == 'svg_css') {
                        setClassName_svg('svg_css_active')
                        setClassName_cambtn('btn_camera_active')
                    }
                    else {
                        setClassName_svg('svg_css')
                        setClassName_cambtn('btn_camera')
                    }
                }}>
                    <svg
                        className={className_svg}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em">
                        <path
                            fillRule="evenodd"
                            d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 00-1 1v6a1 1 0 001 1h7.5a1 1 0 001-1V5a1 1 0 00-1-1H2z"
                        />
                    </svg>
                </button>
            </div>
            <video width='100px' height='100px' controls>
                <source src='video.mp4' type='video/mp4'></source>
            </video>
        </div>

    )
}

export default Camera
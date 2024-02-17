import React, { useEffect, useRef, useState } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";

import Canvas from "../component/Canvas/Canvas";
import './Camera.css'
function Camera({ stateVideoPlay }) {
    const [className_svg, setClassName_svg] = useState('svg_css')
    const [className_cambtn, setClassName_cambtn] = useState('btn_camera')
    const [videoFrame, setVideoFrame] = useState(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)


    // useEffect(() => {
    //     const video = videoRef.current;
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d')
    //     const drawFrame = () => {
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    //         requestAnimationFrame(drawFrame)
    //     };
    //     video.addEventListener('play', drawFrame);
    //     return () => video.removeEventListener('play', drawFrame);
    // }, []);

    const poseRef = useRef(null);
    const [x_landmark, set_x_landmark] = useState(null)
    const [y_landmark, set_y_landmark] = useState(null)
    const [z_landmark, set_z_landmark] = useState(null)

    const onResults = (results) => {
        const RIGHT_WRIST_INDEX = 15
        const LEFT_WRIST_INDEX = 16

        const canvasElement = canvasRef.current;
        const videoElement = videoRef.current;

        const canvasCtx = canvasElement.getContext("2d");
        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;

        // canvasElement.width = videoWidth / 1;
        // canvasElement.height = videoHeight / 1;

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS, { color: '#FF0000', lineWidth: 4 });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#00FF00', lineWidth: 2 });

            const rightWrist = results.poseLandmarks[RIGHT_WRIST_INDEX];
            const leftWright = results.poseLandmarks[LEFT_WRIST_INDEX]
            if (rightWrist) {
                const x = rightWrist.x * 10000;
                const y = rightWrist.y * 10000;
                const z = rightWrist.z * 10000;
                set_x_landmark(`Right Wrist X : ${x}`)
                set_y_landmark(`Right Wrist Y : ${y}`)
                set_z_landmark(`Right Wrist Z : ${z}`)

            }
        }
    };

    const userPose = new Pose({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
    });

    userPose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    useEffect(() => {

        userPose.onResults(onResults);

        poseRef.current = userPose;

        return () => {
            poseRef.current.close();
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current
        if (stateVideoPlay == true) {
            videoRef.current.play()
            var myInterval = setInterval(() => {
                const video = videoRef.current;
                if (video)
                    poseRef.current.send({ image: video });
            }, 70);
            return () => {
                clearInterval(myInterval);
            }
        }


    }, [stateVideoPlay])

    return (
        <div>
            <div className="d-flex" style={{
                width: "50vw",
                height: "35vw",
                marginTop: "2vw"
            }}>
                <Canvas ref={canvasRef}></Canvas>
                {/* <canvas ref={canvasRef} width="950vw" height='680vw' style={{backgroundColor:"black"}}/> */}

                <button className={className_cambtn} onClick={e => {
                    if (className_svg === 'svg_css') {
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
            <video ref={videoRef} width='100px' height='100px' controls muted="muted">
                <source src='video.mp4' type='video/mp4'></source>
            </video>
        </div>

    )
}

export default Camera
import React, { useEffect, useRef, useState } from "react";
import { ReactDOM } from "react";
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";

import Canvas from "../component/Canvas/Canvas";
import './Camera.css'

function Cal_Degree(x1, x2, x3) {

}


function Camera({ stateVideoPlay }) {
    const [className_svg, setClassName_svg] = useState('svg_css')
    const [className_cambtn, setClassName_cambtn] = useState('btn_camera')
    const [videoFrame, setVideoFrame] = useState(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const poseRef = useRef(null);
    const [x_landmark, set_x_landmark] = useState(null)
    const index_landmark = {
        nose: 0,
        left_eye_inner: 1,
        left_eye: 2,
        left_eye_outer: 3,
        right_eye_inner: 4,
        right_eye: 5,
        right_eye_outer: 6,
        left_ear: 7,
        right_ear: 8,
        mouth_left: 9,
        mouth_right: 10,
        left_shoulder: 11,
        right_shoulder: 12,
        left_elbow: 13,
        right_elbow: 14,
        left_wrist: 15,
        right_wrist: 16,
        left_pinky: 17,
        right_pinky: 18,
        left_index: 19,
        right_index: 20,
        left_thumb: 21,
        right_thumb: 22,
        left_hip: 23,
        right_hip: 24,
        left_knee: 25,
        right_knee: 26,
        left_ankle: 27,
        right_ankle: 28,
        left_heel: 29,
        right_heel: 30,
        left_foot_index: 31,
        right_foot_index: 32
    }
    const onResults = (results) => {


        const canvasElement = canvasRef.current;
        const videoElement = videoRef.current;

        const canvasCtx = canvasElement.getContext("2d");

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS, { color: '#FF0000', lineWidth: 4 });
            drawLandmarks(canvasCtx, [results.poseLandmarks[index_landmark.left_wrist]], { color: '#00FF00', lineWidth: 1 });

            const rightWrist = results.poseLandmarks[index_landmark.right_wrist];
            const leftWright = results.poseLandmarks[index_landmark.left_wrist]
            if (rightWrist) {
                const x = rightWrist.x * 10000;
                const y = rightWrist.y * 10000;
                const z = rightWrist.z * 10000;
                set_x_landmark(`Right Wrist X : ${x}`)


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

        if (stateVideoPlay === true) {
            videoRef.current.play()
            // console.log("Video is playing")
            var myInterval = setInterval(() => {
                const video = videoRef.current;
                if (video)
                    poseRef.current.send({ image: video });
            }, 80);
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
            <video ref={videoRef} width='0' height='0' controls muted="muted">
                <source src='video.mp4' type='video/mp4'></source>
            </video>
            <p>{x_landmark}</p>
        </div>

    )
}

export default Camera
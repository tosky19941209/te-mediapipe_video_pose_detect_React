import React, { useState, useEffect, useRef } from 'react';
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";

const VideoPoseDetection = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const poseRef = useRef(null);

    useEffect(() => {
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

        userPose.onResults(onResults);

        poseRef.current = userPose;

        return () => {
            poseRef.current.close();
        };
    }, []);

    const onResults = (results) => {
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        canvasElement.width = videoRef.current.videoWidth;
        canvasElement.height = videoRef.current.videoHeight;

        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(videoRef.current, 0, 0, canvasElement.width, canvasElement.height);

        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS, { color: '#FF0000', lineWidth: 4 });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#00FF00', lineWidth: 2 });
        }
    };

    const handleLoadedData = () => {
        setLoaded(true);
        poseRef.current.send({ image: videoRef.current });
    };

    return (
        <div>
            <video ref={videoRef} width='640' height='480' controls onLoadedData={handleLoadedData}>
                <source src="video.mp4" type="video/mp4" />
            </video>
            <canvas ref={canvasRef} width='640' height='480'></canvas>
        </div>
    );
};

export default VideoPoseDetection;
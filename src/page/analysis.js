import React, { useState, useEffect, useRef } from 'react';
import * as mediapipePose from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from "@mediapipe/pose";

const VideoPoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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

    canvasElement.width = videoWidth / 1;
    canvasElement.height = videoHeight / 1;

    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    canvasCtx.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, mediapipePose.POSE_CONNECTIONS, { color: '#FF0000', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#00FF00', lineWidth: 5 });

      const rightWrist = results.poseLandmarks[RIGHT_WRIST_INDEX];
      const leftWright = results.poseLandmarks[LEFT_WRIST_INDEX]
      if (rightWrist) {
        const x = rightWrist.x*10000;
        const y = rightWrist.y*10000;
        const z = rightWrist.z*10000;
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




  return (
    <>
      <div>
        <video ref={videoRef} width='3000' height='2800' controls onLoadedData={() => {

          var myInterval = setInterval(() => {
            const video = videoRef.current;
            if (video)
              poseRef.current.send({ image: video });
          }, 80);
          return () => {
            clearInterval(myInterval);
          }

        }}>
          <source src="13.mp4" type="video/mp4" />
        </video>

        <canvas ref={canvasRef} ></canvas>
      </div>
      <div style={{marginRight:"1000px"}}>
        <p style={{fontSize:"100px"}}>{x_landmark}</p>
        <p style={{fontSize:"100px"}}>{y_landmark}</p>
        <p style={{fontSize:"100px"}}>{z_landmark}</p>
      </div>
    </>
  );
};

export default VideoPoseDetection;

import React, { useState } from 'react';

const Test = () => {
    const [videoSource, setVideoSource] = useState('video1.mp4');
    const [key, setKey] = useState(0);



    return (
        <div>
            <video key={key} autoPlay controls>
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <select onChange={(e) => {
                    console.log(e.target.value)
                    setVideoSource(e.target.value + '.mp4');
                    // setKey(prevKey => prevKey + 1);

            }}>
                <option>video1</option>
                <option>video2</option>
                <option>video3</option>
            </select>
            {/* <button onClick={changeVideoSource}>Change Video</button> */}
        </div>
    );
};

export default Test;

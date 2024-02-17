import React, { useRef, useState, useEffect } from "react";
import { ReactDOM } from "react";
import Text from '../component/Text/Text'
import './Result.css'
const Result = ({updateStateVideo, stateVideoPlay}) => {
    const [rangeColor, setRangeColor] = useState("blue")
    const [counter, setCounter] = useState(0)
    const [selectOption_exercise_kind, setSelectOption_exercise_kind] = useState('')

    const rangeRef = useRef(null)

    const className = 'd-flex justify-content-center align-content-center'
    const className_d = 'd-flex flex-column justify-content-center align-content-center'

    const result_context = ['Counter', 'Score']
    const kind_exercise = ['exercise_1', 'exercise_2', 'exercise_3', 'exercise_4', 'exercise_5', 'exercise_6']

    useEffect(() => {
        const interval = setInterval(() => {
            if (rangeRef.current.value > 90) {
                setRangeColor("rgb(7, 233, 75)");
            } else {
                setRangeColor("blue");
            }
        }, 100);
        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div className={className}>
            <div className={className} style={{ zIndex: "0", }}>
                <input ref={rangeRef} type="range" value='91' min='0' max='100'
                    style={{
                        transform: 'rotate(270deg)', // Rotate the progress bar to make it vertical
                        width: "35vw",
                        marginLeft: "-15vw",
                        accentColor: `${rangeColor}`
                    }}
                />
            </div>

            {/* Show Result */}
            <div className={className_d}
                style={{
                    width: '20vw',
                    height: '39vw',
                    zIndex: "0",
                    marginLeft: "-14vw",
                }}
            >
                {/* Display the counter and Accuracy */}
                <div className={className_d}
                    style={{
                        width: "20vw",
                        height: "15vw",
                    }}>
                    {
                        result_context.map((item, index) => (
                            <>
                                <div className={className}
                                    style={{
                                        width: "20vw",
                                        height: "5vw",
                                        marginBottom: "1vw",
                                    }}
                                >
                                    <Text text={item} color='blue' mt='1vw' />
                                    {/* <Text text = {counter} color = '' mt='1vh' ml='8vw' fontsi/> */}
                                    <p className={className} style={{ marginLeft: "8vw", marginTop: '0.4vw', fontSize: "2.5vw", color: "red" }}> {counter} </p>
                                </div>
                            </>
                        ))
                    }
                </div>

                {/* Select the kind of exercise */}
                <div
                    style={{
                        width: "20vw",
                        height: "18vw",
                    }}
                >
                    <select className="form-control form-control-lg" value={selectOption_exercise_kind}
                        onChange={(e) => {
                            setSelectOption_exercise_kind(e.target.value)
                        }}>

                        {
                            kind_exercise.map((item, index) => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>  

                {/* Button */}
                <button
                    className="btn_start"
                    style={{ width: "22vw", height: "3vw", fontSize: "1.5vw" }}
                    onClick={() => {
                        // console.log('ok')
                        if(stateVideoPlay === false)
                            updateStateVideo(true)
                        else updateStateVideo(false)
                    }}>
                    Start
                </button>
            </div>
        </div>
    )
}

export default Result
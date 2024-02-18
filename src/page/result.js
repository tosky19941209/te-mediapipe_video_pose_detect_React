import React, { useRef, useState, useEffect } from "react";
import Text from '../component/Text/Text'
import './Result.css'
function Result({ props, updateStateData, results_Data }) {
    const high_limit_accuracy = 80
    const low_limit_accuracy = 10
    const [rangeColor, setRangeColor] = useState("blue")
    // const [selectOption_exercise_kind, setSelectOption_exercise_kind] = useState('video')

    const [result_accuracy, setResultAccuracy] = useState(0)
    const [result_counter, setResultCounter] = useState(0)
    const [result_counter_index, setResultCounterIndex] = useState(true)

    const rangeRef = useRef(null)

    const className = 'd-flex justify-content-center align-content-center'
    const className_d = 'd-flex flex-column justify-content-center align-content-center'

    const result_context = ['Counter', 'Score']
    const kind_exercise = ['video1', 'video2']

    useEffect(() => {
        if (results_Data.cameraState === true) {
            const accuracy = 100 - 100 * (results_Data.accuracy - 90) / 90
            if (accuracy > 100) {
                const new_accuracy = 0
                setResultAccuracy(new_accuracy)
            }
            else {
                const new_accuracy = accuracy
                setResultAccuracy(new_accuracy)
            }

            if (rangeRef.current.value > high_limit_accuracy) {
                setRangeColor("rgb(7, 233, 75)");
                if (result_counter_index === false) {
                    setResultCounter(result_counter + 1)
                    setResultCounterIndex(true)
                }
            } else {
                setRangeColor("blue");
            }
            if (rangeRef.current.value <= low_limit_accuracy) {
                setResultCounterIndex(false)
            }

        }
        else {
            setResultAccuracy(0)
        }
    }, [results_Data])


    return (
        <div className={className}>
            <div className={className} style={{ zIndex: "0", }}>
                <input ref={rangeRef} type="range" value={result_accuracy} min='0' max='100'
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
                                    <p className={className} style={{ marginLeft: "8vw", marginTop: '0.4vw', fontSize: "2.5vw", color: "red" }}> {result_counter} </p>
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
                    <select className="form-control form-control-lg"
                        onChange={(e) => {
                            const new_data = { ...results_Data, kind_exercise: `${e.target.value}.mp4` }
                            updateStateData(new_data)
                            setResultCounter(0)
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
                        if (results_Data.stateVideoPlay === false) {
                            const newData = { ...results_Data, stateVideoPlay: true }
                            updateStateData(newData)
                        }

                        else {
                            const newData = { ...results_Data, stateVideoPlay: false }
                            updateStateData(newData)
                        }
                    }}>
                    Start
                </button>
            </div>
        </div>
    )
}

export default Result
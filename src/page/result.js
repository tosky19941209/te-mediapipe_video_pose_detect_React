import React, { useState } from "react";
import Text from '../component/Text'
function Result() {
    const [counter, setcounter] = useState(0)
    const [selectOption_exercise_kind, setSelectOption_exercise_kind] = useState('')
    const className = 'd-flex justify-content-center align-content-center'
    const className_d = 'd-flex flex-column justify-content-center align-content-center'

    const result_context = ['Counter', 'Accuracy']
    const kind_exercise = ['exercise_1', 'exercise_2', 'exercise_3', 'exercise_4', 'exercise_5', 'exercise_6']

    return (
        <div className={className}>
            <progress value='32' max='100'
                style={{
                    transform: 'rotate(270deg)', // Rotate the progress bar to make it vertical
                    marginLeft:"-13vw",
                    marginRight:"5vw",
                    marginTop:"20vw",
                    width:"30vw"
                }}
            />
{/* Show Result */}
            <div className={className_d}
                style={{
                    width: '20vw',
                    height: '39vw',
                    // backgroundColor: "green",
                    marginLeft: "-10vw",
                }}
                >

{/* Display the counter and Accuracy */}
                <div className={className_d}
                    style={{
                        width: "20vw",
                        height: "15vw",
                        // backgroundColor:"gray"
                    }}>
                    {
                        result_context.map((item, index) => (
                            <>
                                <div className={className}
                                    style={{
                                        width: "20vw",
                                        height: "5vw",
                                        marginBottom: "1vw",
                                        // backgroundColor: 'red'
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
                        // backgroundColor: "red"
                    }}
                >
                    <select class="form-control form-control-lg" value={selectOption_exercise_kind}
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
                <button className="btn btn-info">Start</button>
            </div>
        </div>
    )
}

export default Result
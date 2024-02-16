import React from "react";

function Text(props) {
    return (
        <p className="d-flex justify-content-center align-items-center" style={{
            backgroundColor:`${props.color}`,
            borderRadius:"1.5vw",
            paddingLeft:"1vw",
            paddingRight:"1vw",
            marginTop:`${props.mt}`,
            marginLeft:`${props.ml}`,
            marginRight:`${props.mr}`,
            marginBottom:`${props.mb}`,
            width : "9vw",
            height : "3vw",
            fontSize : "1.2vw"
        }}>
            {props.text}
        </p>
    )
}

export default Text;
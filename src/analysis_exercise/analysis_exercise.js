import React from "react";

function Cal_angle (results, dot1, dot2, dot3) {

    const point1 = results.poseLandmarks[dot1]
    const point2 = results.poseLandmarks[dot2]
    const point3 = results.poseLandmarks[dot3]

    const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
    const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };

    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

    const cosAngle = dotProduct / (magnitude1 * magnitude2);
    const angleInRadians = Math.acos(cosAngle);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}

export default Cal_angle
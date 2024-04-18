/**
 * Rotates a vector by a given angle (in radians)
 * @param {{x: number, y: number}} vector
 * @param {number} angle
 * @returns {{x: number, y: number}}
 */
export function rotateVector(vector, angle) {
    const newX = Math.cos(angle) * vector.x - Math.sin(angle) * vector.y;
    const newY = Math.sin(angle) * vector.x + Math.cos(angle) * vector.y;
    return {x: newX, y: newY};
}

/**
 * Multiplies vector by alpha constant
 * @param {{x: number, y: number}} vector 
 * @param {number} alpha 
 * @returns {{x: number, y: number}}
 */
export function multiplyVector(vector, alpha) {
    return {x: vector.x * alpha, y: vector.y * alpha}
}

/**
 * Adds two vectors
 * @param {{x: number, y: number}} vectorA 
 * @param {{x: number, y: number}} vectorB
 * @returns {{x: number, y: number}}
 */
export function addVectors(vectorA, vectorB) {
    return {x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y};
}

/**
 * Substracts vectorA - vectorB
 * @param {{x: number, y: number}} vectorA 
 * @param {{x: number, y: number}} vectorB
 * @returns {{x: number, y: number}}
 */
export function substractVectors(vectorA, vectorB) {
    return {x: vectorA.x - vectorB.x, y: vectorA.y - vectorB.y};
}

/**
 * Returns vector magnitude
 * @param {{x: number, y: number}} vector
 * @returns {number}
 */
export function vectorMagnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

/**
 * Returns vectors' unit vector, o [0,0] if vector is the null vector
 * @param {{x: number, y: number}} vector 
 * @returns {number}
 */
export function unitVector(vector) {
    const mag = vectorMagnitude(vector);
    if(mag !== 0) {
        return multiplyVector(vector, 1 / mag);
    } else {
        return {x: 0, y: 0};
    }
}
import { addVectors, rotateVector, substractVectors } from "./VectorUtils";

/**
 * Translate a a position (x,y) from the global
 * coordinate system, to a relative coordinate system
 * @param {{x: number, y: number}} globalPos global position to translate
 * @param {{x: number, y: number}} relCordOrigin position of the relative
 * coordinate system
 * @param {number} relCordRot rotation of the relative coordinate system in
 * radians.
 * 
 * @returns {{x: number, y: number}} position in the relative coordinate system
 */
export function globalToRelativePos(globalPos, relCordOrigin, relCordRot = 0) {
    const translatedPos = substractVectors(globalPos, relCordOrigin);
    const translatedRotatedPos = rotateVector(translatedPos, -relCordRot);

    return translatedRotatedPos;
}

/**
 * Translate a position (x,y) from a relative coordinate system
 * to the global coordinate system.
 * @param {{x: number, y: number}} relPos relative position to translate 
 * @param {{x: number, y: number}} relCordOrigin position of the relatieve
 * coordinate system
 * @param {number} relCordRot rotation of the relative coordinate system in
 * radians.
 * 
 * @returns {{x: number, y: number}} position in the global coordinate system
 */
export function relativeToGlobalPos(relPos, relCordOrigin, relCordRot = 0) {
    const rotPos = rotateVector(relPos, relCordRot);
    const translatedRotatedPos = addVectors(rotPos, relCordOrigin);

    return translatedRotatedPos;
}
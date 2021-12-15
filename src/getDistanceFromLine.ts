import getDistance from './getDistance';
import robustAcos from './robustAcos';
import { GeolibInputCoordinates } from './types';

// Returns the minimum distance from a point to a line
const getDistanceFromLine = (
    point: GeolibInputCoordinates,
    lineStart: GeolibInputCoordinates,
    lineEnd: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    const d1 = getDistance(lineStart, point, accuracy);
    const d2 = getDistance(point, lineEnd, accuracy);
    const d3 = getDistance(lineStart, lineEnd, accuracy);

    // alpha is the angle between the line from start to point, and from start to end
    const alpha = Math.acos(
        robustAcos((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3))
    );

    // beta is the angle between the line from end to point and from end to start //
    const beta = Math.acos(
        robustAcos((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3))
    );

    // if the angle is greater than 90 degrees, then the minimum distance is the
    // line from the start to the point
    if (alpha > Math.PI / 2) {
        return d1;
    }

    if (beta > Math.PI / 2) {
        // same for the beta
        return d2;
    }

    // console.log(Math.sin(alpha), Math.sin(alpha) * d1);

    // otherwise the minimum distance is achieved through a line perpendicular
    // to the start-end line, which goes from the start-end line to the point
    return Math.sin(alpha) * d1;
};

export default getDistanceFromLine;

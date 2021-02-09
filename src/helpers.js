// flattens an array that looks like this
//  [ 
//    [{...record1}, {...record2}], 
//    [{...record3}, {...record4}], 
//    [{...record5}, {...record6}]
//  ]
// into one that looks like this
// [ {...record1}, {...record2}, {...record3}, ..., {...record6} ]
export function flatten(arr) {
    return arr.reduce(function (flat,  toFlatten) {
        return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
    }, []);
};


// fills an array with years from start to end
export const fillYearsArray = (start, end) => {
    let s = parseInt(start);
    const e = parseInt(end);
    const filled = [];
    while (s < e) {
      filled.push(s);
      s++;
    }
    filled.push(e);
    return filled;
  };

// parses the longitude and latitude from a coordinates string
export const parseCoordinates = (coordinates) => {
    return coordinates
        .split(",")
        .map((c) => c.trim())
        .map((c) => parseFloat(c));
};
    
// calculates in percent, the change between 2 numbers.
export const getPercentageChange = (oldNumber, newNumber) => {
    const decreaseValue = oldNumber - newNumber;
    const num = ((decreaseValue / oldNumber) * 100).toFixed(2);
    return parseFloat(num * -1);
};

function getMinAndMax(dates: any) {
    var result: any = {};
    for (var index in dates) {
        var thisDate = dates[index],
            dateParts = thisDate.split(/\//),
            fullDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        if (!result["max"] || fullDate > result["max"]) {
            result["max"] = fullDate;
        }
        if (!result["min"] || fullDate < result["min"]) {
            result["min"] = fullDate;
        }
    }
    return result;
}
function isSameWeek(dates: any) {
    var minAndMax: any = getMinAndMax(dates),
        dayOfWeek: any = {};
    dayOfWeek["min"] = minAndMax["min"].getDay();
    dayOfWeek["max"] = minAndMax["max"].getDay();
    if (
        minAndMax["max"] - minAndMax["min"] > 518400000 ||
        dayOfWeek["min"] > dayOfWeek["max"]
    ) {
        return false;
    }
    return true;
}

export { isSameWeek };

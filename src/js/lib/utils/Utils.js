/*
 * Reads the value of the given property from the given object.
 * Returns undefined if an undefined property is encountered.
 */
exports.v = function (propertyPath, object) {
    var value = "";
    var path = propertyPath.split('.');
    try {
        value = path.reduce(function(obj, prop) {
                                return obj[prop];
                            }, object);
    } catch(e) {
        //  Swallow the expection.
    }
    return value;
};


/*
 * Determine if an object has properties. (There just has be a better way, but what the heck).
 */
exports.isEmpty = function (o) {
    for(var key in o) {
        if (o.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

/*
 *  GID generator
 */
exports.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

var date = new Date();

var dateFormat = ([

    date.getDay(),
    date.getMonth(),
    date.getFullYear(),


].join("/") + " " + [

    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),

].join(":"));

console.log(dateFormat)

exports.GetCurrentTime = function() {
    
    return dateFormat;

}
$(document).ready(function() {

    var firstDay = '2018-01-01';
    var firstMoment = moment(firstDay);
    console.log(firstMoment);

    var days = firstMoment.daysInMonth()
    console.log(days);

    var month = firstMoment.format('MMMM')
    console.log(month);

    for (var i = 0; i < days; i++) {
        var htmlCode = "<li>" + (i + 1)  + "</li>";
        $(".month").append(htmlCode);
    }
});

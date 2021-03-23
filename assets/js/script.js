



// Display current Date and time in Jumbotron
var currentDateTime = moment().format("MMMM D YYYY H:mm A")
$("#moment-time").text(currentDateTime);

//get hours, minutes from moment.js object
var hour = moment().hour();
var minute = moment().minutes();
console.log(hour, minute);



//loop over each timeslot and get data attribute 'time' from it
//depending on time, dynamically colors each row of the table gray, red, green
//if hour has not passed, add 'edit' button to third column
$(".timeslot").each(function() {
    var time = $(this).data("time");                                //gets value of data-time attribute from HTML of each table row
    // var now = moment().hour();                                   //uses current hour to evaluate colors of table row
    var now = 13;
    if (time < now) {
        $(this).parent().css({"backgroundColor": "gray"});          // change table row css if condition is true
    } else if (time == now) {
        $(this).parent().css({"backgroundColor": "red"});          // change table row css if condition is true
        //line below the following HTML for edit button to 2nd sibling, which is 3rd column of time table. Button opens 'edit event' modal
        $(this).siblings().next().append("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editEvent' type='submit'>Edit</button>") 
    } else if (time > now) {
        $(this).parent().css({"backgroundColor": "green"});
        //line adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table. Button opens 'edit event' modal
        $(this).siblings().next().append("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editEvent' type='submit'>Edit</button>") //this adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table
    }
});





// Live Update timer
// function liveTime() {
//     $('#moment-time').html(moment().format('MMMM D YYYY H:mm'));
// }
// //calls timer
// setInterval(liveTime, 1000);
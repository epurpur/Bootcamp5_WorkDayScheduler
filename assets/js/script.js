



// Display current Date and time in Jumbotron
var currentDateTime = moment().format("MMMM D YYYY H:mm A")
$("#moment-time").text(currentDateTime);

//get hours, minutes from moment.js object
var hour = moment().hour();
var minute = moment().minutes();
console.log(hour, minute);


//get data back from table rows (specifically the hour)
// $(
//     function(){
//         $(".timeslot").click(
//           function(event){
//               element = $(this).html();
//               console.log(element);
//           }
//         )
//     }
//   )

//loop over each timeslot and get data attribute 'time' from it
$(".timeslot").each(function(index) {
    var time = $(this).data("time");
    // var now = moment().hour();    //uses current hour to evaluate colors of table row
    var now = 13;
    if (time < now) {
        $(this).parent().css({"backgroundColor": "gray"});
    } else if (time == now) {
        $(this).parent().css({"backgroundColor": "red"});
    } else if (time > now) {
        $(this).parent().css({"backgroundColor": "green"});
    }
});
  

//change table row color with javascript. change parent of table row
// $("#rowTest").parent().css({"backgroundColor": "green"});





// Live Update timer
// function liveTime() {
//     $('#moment-time').html(moment().format('MMMM D YYYY H:mm'));
// }
// //calls timer
// setInterval(liveTime, 1000);
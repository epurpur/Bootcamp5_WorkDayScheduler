
var currentDateTime = moment().format("MMMM D YYYY H:mm")
$("#moment-time").text(currentDateTime);

//live update timer START HERE
function liveTime() {
    $('#moment-time').html(moment().format('MMMM D YYYY H:mm'));
}
//calls timer
setInterval(liveTime, 1000);
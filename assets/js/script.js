


// var currentDateTime = moment().format("MMMM D, YYYY hh:mm:ss A")
// $("#moment-time").text(currentDateTime);

//get hours, minutes from moment.js object




function liveTime() {
    // Display current Date and time in Jumbotron
    // Displays as follows: March 23, 2021 02:52 PM
    $('#moment-time').html(moment().format('MMMM D YYYY hh:mm A'));
}
//calls timer
setInterval(liveTime, 1000);                                        //updates at interval of 1 minute (1000ms)


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
        $(this).parent().css({"backgroundColor": "red"});           // change table row css if condition is true
        //line below the following HTML for edit button to 2nd sibling, which is 3rd column of time table. Button opens 'edit event' modal
        $(this).siblings().next().append("<button type='button' class='btn btn-primary editData' data-toggle='modal' data-val='testingdata' data-target='#editEvent' type='submit'>Edit</button>") 
    } else if (time > now) {
        $(this).parent().css({"backgroundColor": "green"});
        //line adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table. Button opens 'edit event' modal
        $(this).siblings().next().append("<button type='button' class='btn btn-primary editData' data-toggle='modal' data-val='testingdata' data-target='#editEvent' type='submit'>Edit</button>") //this adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table
    }
});


//pass data into modal
$(".editData").click(function() {
    //traverses DOM to select HTML content of timeslot column of respective 'edit' button.  // Is there a better way?
    var chosenTime = $(this).parent().siblings().prev().html();  
    
    //passes HTML content of time slot into text of chosen-time span tag
    $("#chosen-time").html(chosenTime);                           
});

//takes 'event description' in modal and passes to user interface
$('#saveBtn').click(function() {
    // gets value of user input
    var eventInformation = $('#eventDescription').val();   
    
    // sets value of eventInformation content of .eventInfo in schedule table. 
    $('.eventInfo').html(eventInformation);  //current changes all event descriptions
    
})
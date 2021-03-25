


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
        $(this).siblings().next().append("<button type='button' class='btn btn-primary editData' data-toggle='modal' data-element='"+time+"' data-target='#editEvent' type='submit'>Edit</button>") 
    } else if (time > now) {
        $(this).parent().css({"backgroundColor": "green"});
        //line adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table. Button opens 'edit event' modal
        $(this).siblings().next().append("<button type='button' class='btn btn-primary editData' data-toggle='modal' data-element='"+time+"' data-target='#editEvent' type='submit'>Edit</button>") //this adds the following HTML for edit button to 2nd sibling, which is 3rd column of time table
    }
});



//pass data into modal
$(".editData").click(function(event) {
    //sets text of eventDescription input box to empty
    $('#eventDescription').val('');
    
    //traverses DOM to select HTML content of timeslot column of respective 'edit' button.  // Is there a better way?
    var chosenTime = $(this).parent().siblings().prev().html();  
    
    //passes HTML content of time slot into text of chosen-time span tag
    $("#chosen-time").html(chosenTime);      
    
    //sets data attribute of <span> #chosenTime to 24 hour value of current hour chosen (ex: 1pm is 13)
    //we need this because when user clicks 'Save' button, this data attribute is used to write output to correct time slot
    var timeValue = $(this).parent().siblings().prev().data('time');

    //sets data-value attribute in <span> chosen-time to numerical value of the hour chosen
    $("#chosen-time").attr('data-hourValue', timeValue);
});



//takes 'event description' in modal and passes to user interface
$('#saveBtn').click(function() {
    // gets value of user input
    var eventInformation = $('#eventDescription').val(); 
    
    // to get HTML of <span> #chosenTime' field of modal. This returns a few HTML elements but I want index[1]
    var chosenTimeHTML = $(this).parent().siblings().prev()[1].querySelector('span');

    //cast chosenTimeHTML to jQuery object
    var chosenTimeHTML = $(chosenTimeHTML);

    // to get data-hourValue data attribute 
    var dataAttribute = chosenTimeHTML.attr('data-hourValue');

    //loops through each row to see if data-value == data-hourValue of current chosen row
    $(".eventInfo").each(function(i, object) {
        var object = $(object);   //converts to jQuery object

        // if data-value of .eventInfo == dataAttribute, set text of input box to that cell in scheduler
        if (object.attr('value') == dataAttribute) {
            object.html(eventInformation);
            
            //set values to localStorage
            setLocalStorage(dataAttribute, eventInformation);
        }
    });
});



function setLocalStorage(objKey, objValue) {
    
    //get current data from localStorage. If no data exists, return empty object
    var dailySchedule = JSON.parse(localStorage.getItem("dailySchedule") || "{}");

    //updates key in dailySchedule and sets equal to objValue. if key doesn't exist yet, creates new key/value pair
    dailySchedule[objKey] = objValue;
    
    //sets updated schedule to localStorage
    localStorage.setItem('dailySchedule', JSON.stringify(dailySchedule));
}


// upon page load, sets values eventInfo cell in each row of calendar
$(document).ready(function() {
    
    //get current data from localStorage. If no data exists, return empty object
    var scheduledItems = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
    
    //selects all rows of table, 2nd column
    var eventInfoItems = $(".eventInfo")
    //iterate through each row of schedule
    $.each(eventInfoItems, function(i, object) {
        var object = $(object);   //converts to jQuery object
        var dataValue = object.attr('value');   

        $.each(scheduledItems, function(key, value) {
            console.log(key);   
            if (key == dataValue) {
                object.text(value);                                 // set text of object equal to value
            }
        });
        
    });

    // $.each(scheduledItems, function(key, value) {
    //     console.log(key, value); 
    // });


});



////////NEED TO SAVE DATA IN LOCAL STORAGE//////////

//thinking about what I want the data structure of local storage to be
/**
 *  var data = {
 *                  '8'  : 'Free',
 *                  '9'  : 'Staff Meeting',
 *                  '10' : 'Check email',
 *                  '11' : 'Prepare Presentation'
 *              }
 */

// var myObj = {}

// myObj[8] = 'check emails';
// myObj['9'] = 'staff meeting';
// myObj['10'] = 'work on project';

// console.log(myObj);

// myObj['8'] = 'prepare presentation';
// console.log(myObj);










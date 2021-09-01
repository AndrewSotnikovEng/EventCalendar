let calendarContainer = document.getElementById('event-calendar');

// var element1 = document.createElement("div");
// element1.appendChild(document.createTextNode('First element'));


// var element2 = document.createElement("div");
// element2.appendChild(document.createTextNode('Second element'));

// var element3 = document.createElement("div");
// element3.appendChild(document.createTextNode('Third element'));

const days = 7;
const shownWeeks = 5;
const middleWeek = 2;

var d = new Date();
var curWeekDay = d.getDay() - 1;
var curMonthDay = d.getDate();



drawGrid()
setNextDates()
setPreviousDates()
setMonthTitle()

function drawGrid() {

    var monthHeader = document.createElement("div");
    monthHeader.setAttribute("id", "month-header")
    calendarContainer.appendChild(monthHeader);

    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //draw header
    var weekDiv = document.createElement("div");
    weekDiv.classList.add("weekdiv")
    calendarContainer.appendChild(weekDiv);
    for (let dayIndex = 0; dayIndex < dayNames.length; dayIndex++) {

        var dayDiv = document.createElement("div")
        dayDiv.appendChild(document.createTextNode(`${dayNames[dayIndex]}`));
        dayDiv.classList.add("headerdiv")
        weekDiv.appendChild(dayDiv)

    }

    //draw content
    for (let weekIndex = 0; weekIndex < shownWeeks; weekIndex++) {

        var weekDiv = document.createElement("div");
        weekDiv.classList.add("weekdiv")
        calendarContainer.appendChild(weekDiv);

        for (let dayIndex = 0; dayIndex < days; dayIndex++) {

            var dayDiv = document.createElement("div")

            dayDivHeader = document.createElement("div")
            dayDivHeader.classList.add("daydiv-header")
            dayDivHeader.innerHTML = curMonthDay;

            dayDivContent = document.createElement("div")
            dayDivContent.setAttribute("id", getShiftedDayId(0));

            dayDiv.appendChild(dayDivHeader)
            dayDiv.appendChild(dayDivContent)

            dayDiv.classList.add("daydiv")
            if (weekIndex == middleWeek && dayIndex == curWeekDay) {
                dayDiv.classList.add("curdaydiv")
                dayDiv.setAttribute("id", "today")
            }
            weekDiv.appendChild(dayDiv)
        }
    }
}

function getShiftedDay(days) {

    var dt = new Date();
    dt.setTime(dt.getTime() + (24 * 60 * 60) * (days * 1000));

    return dt.getDate()

}

function getShiftedDayId(days) {

    var dt = new Date();
    dt.setTime(dt.getTime() + (24 * 60 * 60) * (days * 1000));

    var day = ("0" + dt.getDate()).slice(-2);
    var month = ("0" + (dt.getMonth() + 1)).slice(-2);

    var dayId = (`${day}_${month}_${dt.getFullYear()}`)
    return dayId

}


function setNextDates() {

    let currentDiv = document.getElementById("today");
    let currenWeekDiv = currentDiv.parentElement;

    daysToShift = 1;
    //draw for current week
    while (currentDiv.nextSibling) {
        currentDiv = currentDiv.nextSibling;
        currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
        currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);

        daysToShift++;
    }
    //draw for nextWeeks
    while (currenWeekDiv.nextSibling) {
        currenWeekDiv = currenWeekDiv.nextSibling;
        //presetup for first element
        currentDiv = currenWeekDiv.firstChild;
        currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
        currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);
        daysToShift++;

        while (currentDiv.nextSibling) {
            currentDiv = currentDiv.nextSibling;
            currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
            currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);

            daysToShift++;
        }
    }
}


function setPreviousDates() {

    let currentDiv = document.getElementById("today");
    let currenWeekDiv = currentDiv.parentElement;

    daysToShift = -1;
    //get for current week
    while (currentDiv.previousSibling) {
        currentDiv = currentDiv.previousSibling;
        currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
        currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);

        daysToShift--;
    }
    //get for previousWeeks
    while (currenWeekDiv.previousSibling) {

        currenWeekDiv = currenWeekDiv.previousSibling;
        //presetup for first element
        currentDiv = currenWeekDiv.lastChild;
        currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
        currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);

        daysToShift--;
        while (currentDiv.previousSibling) {
            currentDiv = currentDiv.previousSibling;
            currentDiv.lastChild.setAttribute("id", getShiftedDayId(daysToShift));
            currentDiv.firstChild.innerHTML = getShiftedDay(daysToShift);

            daysToShift--;
        }
        //break if reach the header div
        if (currenWeekDiv.previousSibling.firstChild.classList.contains("headerdiv")) {
            break;
        }
    }
}

function setMonthTitle() {


    const today = new Date()
    let title = today.toLocaleString('pl-PL', { month: 'long' }).toUpperCase()
    let header = document.getElementById("month-header")
    header.innerHTML = title;
}









/*  * * * * * BASIC USAGE * * * * *

        let events = getMockData();
        drawCalendar();
        mapEvents(events);

*/


/*  * * * * * SETTINGS * * * * */
const days = 7;
const shownWeeks = 5;
const middleWeek = 2;
const maxCellRecords = 4;

let calendarContainer = document.getElementById('event-calendar');

var d = new Date();
var curWeekDay = d.getDay() - 1;
var curMonthDay = d.getDate();


class CalendarEvent {
    constructor(name, date) {
        this.name = name;
        this.date = date;
    }
}


function drawCalendar() {
    drawGrid()
    setNextDates()
    setPreviousDates()
    setMonthTitle()
}


function drawGrid() {

    var monthHeader = document.createElement("div");
    monthHeader.setAttribute("id", "month-header")
    calendarContainer.appendChild(monthHeader);

    var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', "Sun"];
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
            dayDiv.setAttribute("onClick", "dayDivOnClickHandler(this)");

            dayDivHeader = document.createElement("div")
            dayDivHeader.classList.add("daydiv-header")
            dayDivHeader.innerHTML = curMonthDay;

            dayDivContent = document.createElement("div")
            dayDivContent.classList.add("daydiv-content")
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

function mapEvents(events) {
    events.forEach(element => {
        let dayDivContent = document.getElementById(element.date);
        if (dayDivContent != null) {
            if (dayDivContent.childNodes.length < maxCellRecords) {
                let value = dayDivContent.innerHTML;
                dayDivContent.innerHTML = value + `<p>${element.name}</p>`;
            }
            switch (dayDivContent.childNodes.length) {
                case 1:
                    dayDivContent.classList.add("one-student-load")
                    break
                case 2:
                    dayDivContent.classList.add("two-student-load")
                    break;
                case 3:
                    dayDivContent.classList.add("three-student-load")
                    break;
                case 4:
                    dayDivContent.classList.add("four-student-load")
                    break;
                case 5:
                    dayDivContent.classList.add("four-student-load")
                    break;
                case 6:
                    dayDivContent.classList.add("four-student-load")
                    break;
            }
        }
    });
}

function getMockData() {

    let events = [

        new CalendarEvent("???????????? ????????????????", getShiftedDayId(5)),
        new CalendarEvent("?????????? ??????????????????c", getShiftedDayId(5)),
        new CalendarEvent("???????? ????????????????", getShiftedDayId(5)),
        new CalendarEvent("???????????? ????????????????", getShiftedDayId(5)),
        new CalendarEvent("?????????????????? ??????????", getShiftedDayId(5)),
        new CalendarEvent("?????????? ????????????????", getShiftedDayId(2)),
        new CalendarEvent("???????????? ????????????????", getShiftedDayId(2)),
        new CalendarEvent("?????????? ??????????", getShiftedDayId(-5)),
        new CalendarEvent("???????????????? ??????????????", getShiftedDayId(1)),
        new CalendarEvent("?????????? ??????????????", getShiftedDayId(1)),
        new CalendarEvent("???????? ????????????????", getShiftedDayId(-5)),
        new CalendarEvent("?????????????? ????????????????", getShiftedDayId(2)),
        new CalendarEvent("???????????????????? ??????????????????", getShiftedDayId(2)),
        new CalendarEvent("?????????? ??????????", getShiftedDayId(-5)),


        new CalendarEvent("?????????? ??????????????????", getShiftedDayId(-2)),
        new CalendarEvent("?????????? ????????????", getShiftedDayId(-2)),
        new CalendarEvent("?????????????? ????????????????", getShiftedDayId(-1)),

        new CalendarEvent("?????????????? ????????????????", getShiftedDayId(-7)),
        new CalendarEvent("???????????????? ??????????????", getShiftedDayId(-7)),
        new CalendarEvent("?????????? ??????????????", getShiftedDayId(-7)),
        new CalendarEvent("???????? ????????????????", getShiftedDayId(-7)),
        new CalendarEvent("???????? ????????????????", getShiftedDayId(-7)),
        new CalendarEvent("???????????? ????????????????", getShiftedDayId(-7)),
        new CalendarEvent("?????????????????? ??????????", getShiftedDayId(-7)),

    ]

    return events;
}

//provide own handler implementation
function dayDivOnClickHandler(dayDiv) {
    console.log(`Clicked div with ID: ${dayDiv.lastChild.id}`)

    let selectedDaydivsCount = document.getElementsByClassName('selected-day-div').length;
    if (selectedDaydivsCount && !dayDiv.classList.contains("selected-day-div")) {
        document.getElementsByClassName('selected-day-div')[0].classList.remove("selected-day-div")
    }
    dayDiv.classList.toggle("selected-day-div");
}
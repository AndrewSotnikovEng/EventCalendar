# Event calendar


Simple event calendar for showing events. Mostly suitable for some study related project.

![alt text](https://user-images.githubusercontent.com/30019543/131864646-04837027-0739-4002-a86b-c52c62c744b2.png)

####HTML code
```html
<!doctype html>
<html lang="en">
<head>
    <link rel="stylesheet" href="css/event-calendar.css">
</head>

<body>
    <div id="event-calendar">
    </div>
    <script src="js/event-calendar.js"></script>
    <script>
        let events = getMockData(); //here should be your API data of array type
        drawCalendar();
        mapEvents(events);
    </script>
</body>
</html>
```

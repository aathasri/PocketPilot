document.addEventListener("DOMContentLoaded", function () {
    // Get AJAX Req.
    function fetchScheduleData() {
        fetch('/data/generatedSchedule')
            .then(response => response.json())
            .then(data => {
                populateCalendar(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Populate Calendar with JSON
    function populateCalendar(scheduleData) {
        // Populating Calendar with Courses
        scheduleData.courses.forEach(course => {
            course.schedule.forEach(session => {
                createCalendarEvent(course, session);
            });
        });

        // Populating Calendar with exams_and_quizzes

        // Populating Calendar with assignments

        // Populating Calendar with life

    }

    // Create Calendar event, place in DOM
    function createCalendarEvent(course, session) {

        // Calculate where to place the event on the calendar based on the day and time
        // Replace `.calendar-column[data-day='${session.day}']` with actual calendar path based on HTML structure
        const dayColumn = document.querySelector(/*`.calendar-column[data-day='${session.day}']`*/);
        const timeRow = calculateTimeRow(session.start_time, session.end_time);

        // Create the event element
        const eventElement = document.createElement('div');
        eventElement.className = 'calendar-event';
        eventElement.textContent = `${course.course_name} (${course.course_number})`;
        eventElement.style.gridRow = timeRow;

        // Add styles based on the type of event (different background colors, etc)
        eventElement.style.backgroundColor = determineEventColor(course.course_number);

        // Append the event to that day's column
        dayColumn.appendChild(eventElement);
    }

    // Function to determine the grid row based on the event's start and end time
    function calculateTimeRow(startTime, endTime) {
        // Convert times to a format that can be used to determine the grid row
        // Implement this based on the grid for the calendar
        // ...

        return timeRow;
    }

    // Function to determine event color (extend this)
    function determineEventColor(courseNumber) {
        const colors = {
            "BIO101": "#ffadad",  // Example color for BIO101
            "SPAN201": "#ffd6a5", // Example color for SPAN201
            /* More colors for different courses
            .
            .
            .
            .
            .
            */
           // Make this customizable based on user inputs????
        };

        return colors[courseNumber] || "#d3d3d3"; // Default color if courseNumber is not in list
    }

    // Initial call to fetch and populate data
    fetchScheduleData();
});

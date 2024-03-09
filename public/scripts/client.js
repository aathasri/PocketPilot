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
    function createCalendarEvent(type, item, session) {
        const calendar = document.getElementById('calendar'); // Replace with actual calendar ID
        // Calculate which day column and time row the event should be placed in
        const dayColumn = session.day.toLowerCase(); // assuming your columns are named by lowercased day names
        const timeRowStart = calculateTimeRow(session.start_time);
        const timeRowEnd = calculateTimeRow(session.end_time);

        // Create the event element
        const eventElement = document.createElement('div');
        eventElement.className = `calendar-event ${type}`;
        eventElement.textContent = type === 'course' ? `${item.course_name} (${item.course_number})` : item.assignment_name; // customize based on type
        eventElement.style.gridColumn = dayColumn;
        eventElement.style.gridRowStart = timeRowStart;
        eventElement.style.gridRowEnd = timeRowEnd;
        eventElement.style.backgroundColor = determineEventColor(item.course_number || item.class); // course_number for courses, class for others

        // Append the event to that day's column
        calendar.appendChild(eventElement);
    }

    // Function to determine the grid row based on the event's start and end time
    function calculateTimeRow(time) {
        // Convert times to a 24-hour format that can be mapped to your calendar grid rows
        const timeParts = time.match(/(\d+):(\d+) (AM|PM)/);
        let hour = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const isPm = timeParts[3] === 'PM';

        if (isPm && hour < 12) {
            hour += 12;
        } else if (!isPm && hour === 12) {
            hour = 0;
        }

        // Assuming each hour block in your calendar corresponds to a grid row
        // Adjust this formula based on how your grid is set up
        return hour - 8; // If your calendar starts at 8AM, for example
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

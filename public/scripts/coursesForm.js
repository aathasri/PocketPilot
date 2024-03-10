const form = document.getElementById('coursesForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form); // Create FormData object from form
    const jsonData = {}; // Create object to store form data as JSON

    // Convert FormData to JSON
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // Send form data to server
    try {
        const response = await fetch('/submit/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const data = await response.json();
        console.log(data);
        // Handle response from server if needed
    } catch (error) {
        console.error('Error:', error);
    }
});
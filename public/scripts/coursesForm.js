const form = document.getElementById('coursesForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form); // Create FormData object from form

    // Log form data to console
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
    }

    // Send form data to server
    try {
        const response = await fetch('/submit/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });

        const data = await response.json();
        console.log(data);
        // Handle response from server if needed
    } catch (error) {
        console.error('Error:', error);
    }
});

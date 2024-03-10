function handleSubmit(form, jsonFileName) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Log form data to console
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]); 
        }

        // Send form data to server
        try {
            const response = await fetch(`/submit/${jsonFileName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            });

            const data = await response.json();
            console.log(data);

            // Handle response from server
            if (response.ok) {
                // If the response is okay (status 200-299), do something with the response data
                console.log('Form submitted successfully!');
                // You can redirect the user to another page if needed
                // window.location.href = '/success.html';
            } else {
                // If the response is not okay, log the error
                console.error('Server responded with an error:', data.error);
                // You can display an error message to the user if needed
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Error:', error);
        }
    });
}

// Usage for each form
const coursesForm = document.getElementById('coursesForm');
handleSubmit(coursesForm, 'courses');

const examsForm = document.getElementById('examsForm');
handleSubmit(examsForm, 'exams');

const assignmentsForm = document.getElementById('assignmentsForm');
handleSubmit(assignmentsForm, 'assignments');
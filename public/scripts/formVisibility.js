document.addEventListener('DOMContentLoaded', (event) => {
    // Event listener for clicking on the courses div
    document.getElementById('courses').addEventListener('click', function() {
        toggleForm('cForm');
    });

    // Event listener for clicking on the assignment div
    document.getElementById('assignment').addEventListener('click', function() {
        toggleForm('aForm'); // Assuming 'aForm' is the id of the assignment form
    });

    // Event listener for clicking on the assessment div
    document.getElementById('assessment').addEventListener('click', function() {
        toggleForm('asForm'); // Assuming 'asForm' is the id of the assessment form
    });

    // Function to show or hide forms
    function toggleForm(formId) {
        let form = document.getElementById(formId);
        if(form) {
            if (form.style.display === "none" || form.style.display === "") {
                form.style.display = "block"; // Show the form
            } else {
                form.style.display = "none"; // Hide the form
            }
        }
    }
});

// Toggle form visibility function
function toggleForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.classList.toggle('hidden');
    }
  }
  
  // Event listeners for form toggle buttons
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('[data-toggle-form]');
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const formId = e.target.getAttribute('data-toggle-form');
        toggleForm(formId);
      });
    });
  });
  

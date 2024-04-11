// Image slider for services section
let currentIndex = 0;
const services = document.querySelectorAll('.service');
const totalServices = services.length;

function showService(index) {
    services.forEach((service, i) => {
        if (i === index) {
            service.style.display = 'block';
        } else {
            service.style.display = 'none';
        }
    });
}

function nextService() {
    currentIndex = (currentIndex + 1) % totalServices;
    showService(currentIndex);
}

function prevService() {
    currentIndex = (currentIndex - 1 + totalServices) % totalServices;
    showService(currentIndex);
}

// Show the first service initially
showService(currentIndex);

// Optional: Add event listeners for next and previous buttons
document.getElementById('nextBtn').addEventListener('click', nextService);
document.getElementById('prevBtn').addEventListener('click', prevService);

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const message = document.querySelector('#message').value;

	console.log(`Name: ${name}`);
	console.log(`Email: ${email}`);
	console.log(`Message: ${message}`);

	form.reset();
});
const bookAppointmentButton = document.querySelector('#book-appointment');
const bookNowButton = document.querySelector('#book-now');

bookAppointmentButton.addEventListener('click', () => {
	// Handle book appointment button click
});

bookNowButton.addEventListener('click', () => {
	// Handle book now button click
});
// JavaScript for handling user interactions

// Example: Handle form submission for booking an appointment
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    // Send data to server for booking appointment using AJAX/Fetch
    // Example: fetch('/api/appointments', { method: 'POST', body: JSON.stringify({ name, date, time }) })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
});
async function bookAppointment(appointment) {
    try {
        const response = await fetch('https://api.example.com/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        });
        const result = await response.json();
        if (result.success) {
            alert('Appointment booked successfully!');
            // Optionally update UI to reflect the booking
        } else {
            alert('Failed to book appointment. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

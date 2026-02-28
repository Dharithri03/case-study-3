// Appointments Logic
document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth(); // Defined in main.js
    if (!user) return; // checkAuth will redirect if not logged in

    const patientNameInput = document.getElementById('patientName');
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentForm = document.getElementById('appointmentForm');

    // Pre-fill Patient Name
    patientNameInput.value = user.fullName;

    // Check if doctor is pre-selected from URL
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedDoc = urlParams.get('doctor');
    if (preSelectedDoc) {
        doctorSelect.value = preSelectedDoc;
    }

    // Initial table render
    renderAppointments();

    // Booking Submission
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const doctor = doctorSelect.value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const reason = document.getElementById('reason').value;

        // Validation (basic HTML ensures most, but let's double check dates)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showToast('Please select a future date.', 'error');
            return;
        }

        const newAppointment = {
            id: Date.now(),
            userId: user.id, // Linked to current user
            doctor,
            date,
            time,
            reason: reason || 'N/A',
            bookedAt: new Date().toISOString()
        };

        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        showToast('Appointment booked successfully!', 'success');
        appointmentForm.reset();
        patientNameInput.value = user.fullName; // Reset pre-fill
        renderAppointments();
    });
});

function renderAppointments() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Filter appointments for THIS user only
    const userAppointments = appointments.filter(a => a.userId === user.id);

    const list = document.getElementById('appointmentList');
    const emptyState = document.getElementById('noAppointments');

    list.innerHTML = '';

    if (userAppointments.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    userAppointments.forEach(appt => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${appt.doctor}</strong></td>
            <td>${appt.date} at ${appt.time}</td>
            <td>${appt.reason}</td>
            <td><button class="btn cancel-btn" onclick="cancelAppointment(${appt.id})">Cancel</button></td>
        `;
        list.appendChild(row);
    });
}

function cancelAppointment(id) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        showToast('Appointment cancelled.', 'success');
        renderAppointments();
    }
}

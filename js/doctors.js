// Doctor data and listing logic
const doctors = [
    {
        id: 1,
        name: "Dr. James Smith",
        specialization: "Cardiologist",
        experience: "12+ Years",
        department: "Cardiology",
        status: "available",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 2,
        name: "Dr. Sarah Connor",
        specialization: "Neurologist",
        experience: "10+ Years",
        department: "Neurology",
        status: "available",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 3,
        name: "Dr. Robert Wilson",
        specialization: "Pediatrician",
        experience: "15+ Years",
        department: "Pediatrics",
        status: "busy",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 4,
        name: "Dr. Emily Davis",
        specialization: "Dermatologist",
        experience: "8+ Years",
        department: "Dermatology",
        status: "available",
        image: "https://images.unsplash.com/photo-1559839734-2b71bc197ec2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 5,
        name: "Dr. Michael Brown",
        specialization: "General Physician",
        experience: "20+ Years",
        department: "General Medicine",
        status: "available",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 6,
        name: "Dr. Linda Taylor",
        specialization: "Pediatrician",
        experience: "7+ Years",
        department: "Pediatrics",
        status: "available",
        image: "https://images.unsplash.com/photo-1527613426075-472d814aaf36?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const listing = document.getElementById('doctorListing');
    const searchInput = document.getElementById('doctorSearch');
    const deptFilter = document.getElementById('deptFilter');

    // Initial Render
    renderDoctors(doctors);

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterAndRender();
    });

    // Filter Logic
    deptFilter.addEventListener('change', () => {
        filterAndRender();
    });

    function filterAndRender() {
        const query = searchInput.value.toLowerCase();
        const dept = deptFilter.value;

        const filtered = doctors.filter(doc => {
            const matchesQuery = doc.name.toLowerCase().includes(query) ||
                doc.specialization.toLowerCase().includes(query);
            const matchesDept = dept === 'all' || doc.department === dept;
            return matchesQuery && matchesDept;
        });

        renderDoctors(filtered);
    }
});

function renderDoctors(docs) {
    const listing = document.getElementById('doctorListing');
    listing.innerHTML = docs.length ? '' : '<p style="text-align:center; width: 100%; grid-column: 1/-1;">No doctors found matching your criteria.</p>';

    docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'card doctor-card';
        card.innerHTML = `
            <img src="${doc.image}" class="doctor-img" alt="${doc.name}">
            <span class="doctor-spec">${doc.specialization}</span>
            <h3>${doc.name}</h3>
            <p class="doctor-exp">${doc.experience} Experience</p>
            <span class="doctor-status status-${doc.status.toLowerCase()}">${doc.status}</span>
            <a href="appointments.html?doctor=${encodeURIComponent(doc.name)}" class="btn auth-btn" style="width:100%; display:block; text-align:center;">Book Now</a>
        `;
        listing.appendChild(card);
    });
}

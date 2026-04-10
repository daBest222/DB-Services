function OnNameChanged(nameInput) {
    if (nameInput.value.trim() === "" || nameInput.value.trim().length <= 2) {
        nameInput.style.borderColor = "red";

        return true;

    } else {
        nameInput.style.borderColor = "green";

        return false
    }
}

function OnEmailChanged(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.style.borderColor = "red";

        return true;

    } else {
        emailInput.style.borderColor = "green"; 

        return false
    }
}

function OnAddressChanged(addressInput) {
    if (addressInput.value.trim() === "" || addressInput.value.trim().length <= 5) {
        addressInput.style.borderColor = "red";

        return true;

    } else {
        addressInput.style.borderColor = "green";

        return false
    }
}

async function OnBookingFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("bookingForm");
    const nameInput = form.getElementById("name");
    const emailInput = form.getElementById("email");
    const serviceSelect = form.getElementById("service");
    const notesInput = form.getElementById("notes");
    const addressInput = form.getElementById("address");
    const dateInput = form.getElementById("date");
    const subscribeCheckbox = form.getElementById("subscribe");
    const honeypotInput = form.getElementById("website");
    const formMessage = form.getElementById("formMessage");

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        service: serviceSelect.value,
        notes: notesInput.value.trim(),
        address: addressInput.value.trim(),
        date: dateInput.value,
        subscribe: subscribeCheckbox.checked,
        honeypot: honeypotInput.value
    };

    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyXuOehIxNRJh-ZaOHAYxPVow0oDCnLGEUzd2pSgbrG746b53Dp2dPeSFDMxq7OeyMl/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        const formMessage = form.getElementById("formMessage");

        if (result.status === "error") {
            console.error(result.message);
            formMessage.textContent = result.message;
            formMessage.style.color = "red";

        } else {
            console.log("Success:", result);
            formMessage.textContent = "Booking successful!";
            formMessage.style.color = "green";
        }

    } catch (err) {
        console.error("Network error:", err);
        alert("Failed to submit");
    }
}

function initServiceCardClicks() {
    const cards = document.querySelectorAll(".card, .bundle-card");
    const serviceSelect = document.getElementById("service");
    
    // Add options for each service card
    cards.forEach(card => {
        const serviceName = card.querySelector("h2").textContent;
        const option = document.createElement("option");
        option.value = serviceName;
        option.textContent = serviceName;
        serviceSelect.appendChild(option);
        
        // Add click event listener
        card.addEventListener("click", function() {
            const bookingSection = document.getElementById("bookings");
            
            // Scroll to booking section
            bookingSection.scrollIntoView({ behavior: "smooth" });
            
            // Select the service
            serviceSelect.value = serviceName;
        });
    });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initServiceCardClicks);
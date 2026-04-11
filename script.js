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

async function SendData(data) {
    try {
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        await fetch("https://script.google.com/macros/s/AKfycbyXuOehIxNRJh-ZaOHAYxPVow0oDCnLGEUzd2pSgbrG746b53Dp2dPeSFDMxq7OeyMl/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

    } catch (err) {
        console.error("Network error:", err);
        throw err;
    }
}

function ClearForm(form) {
    form.reset();
}

async function OnManageEmailFormSubmit(event, form) {
    event.preventDefault();

    const emailInput = document.getElementById("manageEmail");

    const data = {
        email: emailInput.value.trim(),
    };

    if (document.getElementById("manageSubscription").value === "subscribe") {
        data.mode = "add-email";

    } else {
        data.mode = "remove-email";
    }

    try {
        await SendData(data);
        ClearForm(form);
        alert("Subscription updated successfully!");

    } catch (err) {
        console.error("Network error:", err);
        alert("Failed to update subscription. Please try again later.");
    }
}

async function OnBookingFormSubmit(event, form) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const serviceSelect = document.getElementById("service");
    const notesInput = document.getElementById("notes");
    const addressInput = document.getElementById("address");
    const dateInput = document.getElementById("date");
    const subscribeCheckbox = document.getElementById("subscribe");
    const honeypotInput = document.getElementById("website");

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        service: serviceSelect.value,
        notes: notesInput.value.trim(),
        address: addressInput.value.trim(),
        date: dateInput.value,
        subscribe: subscribeCheckbox.checked,
        honeypot: honeypotInput.value,
        mode: "book",
        key: Math.floor(Date.now() / 60000)
    };

    try {
        await SendData(data);
        ClearForm(form);
        alert("Booking submitted successfully!");

    } catch (err) {
        console.error("Network error:", err);
        alert("Failed to submit booking. Please try again later.");
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
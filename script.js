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

        const res = await fetch("https://script.google.com/macros/s/AKfycbyXuOehIxNRJh-ZaOHAYxPVow0oDCnLGEUzd2pSgbrG746b53Dp2dPeSFDMxq7OeyMl/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        const result = await res.json();

        return result;

    } catch (error) {
        console.error("Error sending data:", error);

        throw error;
    }

}

function ClearForm() {
    document.getElementById("bookingForm").reset();
    document.getElementById("formMessage").textContent = "";
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
    const formMessage = document.getElementById("formMessage");

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
        const result = await SendData(data);

        if (result.status === "error") {
            console.error(result.message);
            formMessage.textContent = result.message;
            formMessage.style.color = "red";

        } else {
            console.log("Success:", result);
            formMessage.textContent = "Booking successful!";
            formMessage.style.color = "green";
            ClearForm();
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
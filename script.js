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

        await fetch("https://script.google.com/macros/s/YOUR_ID/exec", {
            method: "POST",
            body: formData
        });
        return true;

    } catch (error) {
        console.error("Error sending data:", error);

        return false;
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
        data.type = "add-email";

    } else {
        data.type = "remove-email";
    }

    form.disabled = true;

    if (await SendData(data)) {
        alert("Request successful! We will process it soon.");
        ClearForm(form);
        form.disabled = false;
    
    } else {
        alert("An error occurred while sending your request. Please try again later.");
        form.disabled = false;
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
        type: "book",
        key: Math.floor(Date.now() / 60000)
    };

    form.disabled = true;

    if (await SendData(data)) {
        alert("Request successful! We will process it soon.");
        ClearForm(form);
        form.disabled = false;
    
    } else {
        alert("An error occurred while sending your request. Please try again later.");
        form.disabled = false;
    }
}

function ProcessServerResponse(event) {
    const data = event.data;

    if (event.origin !== "https://dabest2222.github.io") return;

    if (data.status === "success") {
        if (data.type === "book") {
            alert("Booking successful! We will contact you soon.");
            document.getElementById("bookingForm").reset();

        } else if (data.type === "add-email") {
            alert("Subscription successful! You will now receive promotions.");
            document.getElementById("manageEmailForm").reset();

        } else if (data.type === "remove-email") {
            alert("Unsubscription successful! You will no longer receive promotions.");
            document.getElementById("manageEmailForm").reset();
        }
    } else {
        alert("An error occurred: " + data.message);
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

window.addEventListener("message", ProcessServerResponse);

const btn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
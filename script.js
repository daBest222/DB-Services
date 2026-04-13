async function InitWindow() {
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

    const btn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    const config = await GetConfig();
    document.getElementById("bookingIframe").src = config.apiUrl + "?form=booking";
    document.getElementById("manageEmailIframe").src = config.apiUrl + "?form=subscription";
}

async function GetConfig() {
  const response = await fetch("config.json");
  const config = await response.json();
  return config;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", InitWindow());
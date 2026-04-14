async function InitWindow() {
    const cards = document.querySelectorAll(".card, .bundle-card");
    
    // Add options for each service card
    cards.forEach(card => {
        
        // Add click event listener
        card.addEventListener("click", function() {
            const bookingSection = document.getElementById("bookings");
            
            // Scroll to booking section
            bookingSection.scrollIntoView({ behavior: "smooth" });
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

window.addEventListener("message", (event) => {
  if (event.data.type === "resizeIframe") {
    if (event.data.iframe === "booking") {
        const iframe = document.getElementById("bookingIframe");
        alert("Resizing booking iframe to " + event.data.height + "px");

    } else if (event.data.iframe === "subscription") {
        const iframe = document.getElementById("manageEmailIframe");
        alert("Resizing subscription iframe to " + event.data.height + "px");
    }

    iframe.style.height = event.data.height + "px";
  }
});
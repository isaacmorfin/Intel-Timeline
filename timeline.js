const goals = [
            {
                year: 2025,
                title: "Achieve 100% Renewable Energy",
                details: "Intel aims to power all global operations with 100% renewable electricity by 2025, reducing its carbon footprint and supporting clean energy initiatives.",
                icon: "⚡",
                image: "assets/renewable.jpg"
            },
            {
                year: 2027,
                title: "Reduce Waste to Landfill",
                details: "Intel is committed to sending zero hazardous waste to landfill and reducing overall waste generation.",
                icon: "♻️",
                image: "assets/recycle.jpg"
            },
            {
                year: 2030,
                title: "Net Positive Water Use",
                details: "By 2030, Intel plans to restore more water than it consumes in its global operations, supporting local watersheds and communities.",
                icon: "💧",
                image: "assets/water.jpg"
            },
            {
                year: 2032,
                title: "Increase Green Supply Chain",
                details: "Intel will ensure that 90% of its key suppliers set their own science-based emissions reduction targets.",
                icon: "🚚",
                image: "assets/supplychain.jpg"
            },
            {
                year: 2040,
                title: "Net Zero Greenhouse Gas Emissions",
                details: "Intel is committed to reaching net zero greenhouse gas emissions across its global operations by 2040, investing in energy efficiency and innovative technologies.",
                icon: "🌎",
                image: "assets/netzero.jpg"
            },
            {
                year: 2045,
                title: "Sustainable Product Design",
                details: "Intel will design all new products and packaging with sustainability as a core principle, reducing lifecycle environmental impact.",
                icon: "🛠️",
                image: "assets/design.jpg"
            }
        ];

        const timeline = document.getElementById('timeline');

        goals.forEach((goal, idx) => {
            const event = document.createElement('div');
            event.className = 'event';
            event.tabIndex = 0; // Make focusable
            event.style.animationDelay = `${idx * 0.15}s`;

            event.innerHTML = `
                <div class="event-marker">${goal.icon || ""}</div>
                <div class="event-content">
                    ${goal.image ? `<img src="${goal.image}" alt="" class="event-image" loading="lazy"/>` : ""}
                    <div>
                        <div class="event-year">${goal.year}</div>
                        <div class="event-title">${goal.title}</div>
                        <div class="event-details">${goal.details}</div>
                    </div>
                </div>
            `;
            event.addEventListener('click', () => {
    // Fill modal content
    document.getElementById('eventModalLabel').textContent = goal.title + " (" + goal.year + ")";
    document.getElementById('eventModalBody').innerHTML = `
        ${goal.image ? `<img src="${goal.image}" alt="" class="img-fluid mb-3" style="max-height:180px;object-fit:cover;border-radius:10px;">` : ""}
        <p>${goal.details}</p>
    `;
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
});
            event.addEventListener('click', (e) => {
                // Only toggle if not clicking on image (to allow image preview in future)
                if (!e.target.classList.contains('event-image')) {
                    event.classList.toggle('open');
                }
            });
            timeline.appendChild(event);
        });

        // Fade-in on scroll
        function revealOnScroll() {
            const events = document.querySelectorAll('.event');
            const windowHeight = window.innerHeight;
            events.forEach(event => {
                const rect = event.getBoundingClientRect();
                if (rect.top < windowHeight - 50) {
                    event.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        let aiState = "idle";
        let pushTimeout;
        const timelineDiv = document.querySelector('.timeline');
        const robot = document.getElementById('robot');
        const sweat = document.getElementById('sweat');
        const aiAnim = document.getElementById('ai-anim');
        const head = document.getElementById('head');
        const armLeft = document.getElementById('arm-left');
        const armRight = document.getElementById('arm-right');
        const legLeft = document.getElementById('leg-left');
        const legRight = document.getElementById('leg-right');
        const robotRow = document.getElementById('robot-row');
        const robotArea = robotRow.querySelector('div[style*="position: relative"]');

        function setAIState(state, direction = null) {
            aiState = state;
            // Animate arms/legs/head for walking
            if (state === "pushing-left" || state === "pushing-right") {
                // Animate arms and legs
                armLeft.style.transformOrigin = "23px 80px";
                armLeft.style.animation = "walk-arm-left 0.5s infinite";
                armRight.style.transformOrigin = "77px 80px";
                armRight.style.animation = "walk-arm-right 0.5s infinite";
                legLeft.style.transformOrigin = "42px 121px";
                legLeft.style.animation = "walk-leg-left 0.5s infinite";
                legRight.style.transformOrigin = "58px 121px";
                legRight.style.animation = "walk-leg-right 0.5s infinite";
                head.style.animation = "head-bob 0.5s infinite";
                sweat.setAttribute("opacity", "0");
                // Move robot further to the left or right
                let percent = 50;
                if (direction === "left") percent = 5;
                if (direction === "right") percent = 85;
                aiAnim.style.left = percent + "%";
                aiAnim.style.transition = "left 0.6s cubic-bezier(.4,2,.6,1)";
                // Flip robot for left
                robot.style.transform = direction === "left" ? "scaleX(-1)" : "scaleX(1)";
            } else if (state === "tired") {
                head.style.animation = "";
                robot.style.transform = "scale(1.1) translateY(10px)";
                sweat.setAttribute("opacity", "1");
                // Stop walking
                armLeft.style.animation = "";
                armRight.style.animation = "";
                legLeft.style.animation = "";
                legRight.style.animation = "";
                armLeft.style.transform = "";
                armRight.style.transform = "";
                legLeft.style.transform = "";
                legRight.style.transform = "";
            } else {
                // Idle: center robot, stop animation
                aiAnim.style.left = "50%";
                aiAnim.style.transition = "left 0.6s cubic-bezier(.4,2,.6,1)";
                robot.style.transform = "none";
                head.style.animation = "";
                sweat.setAttribute("opacity", "0");
                armLeft.style.animation = "";
                armRight.style.animation = "";
                legLeft.style.animation = "";
                legRight.style.animation = "";
                armLeft.style.transform = "";
                armRight.style.transform = "";
                legLeft.style.transform = "";
                legRight.style.transform = "";
            }
        }

        function checkTimelineEnds(direction) {
            const atLeft = timelineDiv.scrollLeft <= 0;
            const atRight = Math.abs(timelineDiv.scrollLeft + timelineDiv.clientWidth - timelineDiv.scrollWidth) < 2;
            if ((direction === "left" && atLeft) || (direction === "right" && atRight)) {
                setAIState("tired", direction);
                setTimeout(() => setAIState("idle"), 1200);
                return true;
            }
            return false;
        }

        document.getElementById('scrollLeft').onclick = () => {
            if (!checkTimelineEnds("left")) {
                setAIState("pushing-left", "left");
                timelineDiv.scrollBy({left: -300, behavior: "smooth"});
                clearTimeout(pushTimeout);
                pushTimeout = setTimeout(() => setAIState("idle"), 900);
            }
        };
        document.getElementById('scrollRight').onclick = () => {
            if (!checkTimelineEnds("right")) {
                setAIState("pushing-right", "right");
                timelineDiv.scrollBy({left: 300, behavior: "smooth"});
                clearTimeout(pushTimeout);
                pushTimeout = setTimeout(() => setAIState("idle"), 900);
            }
        };

        timelineDiv.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                if (e.deltaX > 0) {
                    if (!checkTimelineEnds("right")) {
                        setAIState("pushing-right", "right");
                        clearTimeout(pushTimeout);
                        pushTimeout = setTimeout(() => setAIState("idle"), 900);
                    }
                } else if (e.deltaX < 0) {
                    if (!checkTimelineEnds("left")) {
                        setAIState("pushing-left", "left");
                        clearTimeout(pushTimeout);
                        pushTimeout = setTimeout(() => setAIState("idle"), 900);
                    }
                }
            }
        }, { passive: true });

        // After all events are appended:
        const events = document.querySelectorAll('.event');

        // Intersection Observer for scroll snap/transform effect
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                entry.target.classList.add('visible');
              } else {
                entry.target.classList.remove('visible');
              }
            });
          },
          {
            root: document.querySelector('.timeline'),
            threshold: 0.7 // Adjust for sensitivity
          }
        );

        events.forEach(event => observer.observe(event));
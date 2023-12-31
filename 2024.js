document.addEventListener("DOMContentLoaded", function() {
    const welcomeNoteElement = document.getElementById("welcome-note");
    const countdownElement = document.getElementById("countdown");
    const countdownDisplayElement = document.getElementById("countdown-value");
    const fireworksContainer = document.getElementById("fireworks-container");
    const shortNoteElement = document.getElementById("short-note");
    const fireworksCanvas = document.createElement("canvas");
    fireworksContainer.appendChild(fireworksCanvas);
    const ctx = fireworksCanvas.getContext("2d");
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  
    function drawFirework(x, y) {
      const colors = ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9'];
      const particles = [];
  
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
  
        particles.push({ x, y, angle, speed, size, color });
      }
  
      particles.forEach(particle => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.speed *= 0.98;
        particle.size *= 0.95;
  
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
  
        // Add congratulatory emojis and flyers
        if (Math.random() < 0.05) {
          ctx.font = "20px Arial";
          ctx.fillStyle = "#fff";
          ctx.fillText("🎉", particle.x, particle.y);
        }
        if (Math.random() < 0.02) {
          ctx.font = "15px Arial";
          ctx.fillStyle = "#fff";
          ctx.fillText("🎈", particle.x, particle.y);
        }
      });
  
      return particles.some(particle => particle.size > 0.5);
    }
  
    function startFireworks() {
      let particles = [];
  
      function animate() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  
        particles = particles.filter(particle => particle.size > 0.5);
  
        particles.forEach(particle => {
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y += Math.sin(particle.angle) * particle.speed;
          particle.speed *= 0.98;
          particle.size *= 0.95;
  
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
  
          // Add congratulatory emojis and flyers
          if (Math.random() < 0.05) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("🎉", particle.x, particle.y);
          }
          if (Math.random() < 0.02) {
            ctx.font = "15px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("🎈", particle.x, particle.y);
          }
        });
  
        if (Math.random() < 0.02) {
          const x = fireworksCanvas.width * Math.random();
          const y = fireworksCanvas.height * Math.random();
          particles = particles.concat(drawFirework(x, y));
        }
  
        requestAnimationFrame(animate);
      }
  
      animate();
    }
  
    function displayShortNote() {
      const note = "The year 2023 wasn't an easy one but looks like we made it. Amidst all commotions, setbacks, failures, and success we made it to the end without losing one another. 2024 isn't going to be easy per se, but in the midst of challenges leaders are made. I am looking forward to seeing your leadership skills in 2024. Go and dominate, CHAMP! SEE YOU AT THE TOP. Love, Chinenye";
      
      shortNoteElement.textContent = note;
    }
  
    function startCountdown() {
      let year = 2023;
      let seconds = 5;
  
      function updateCountdown() {
        countdownElement.textContent = year;
        countdownDisplayElement.textContent = seconds;
  
        if (seconds <= 0) {
          countdownElement.textContent = "Happy New Year!";
          countdownDisplayElement.textContent = "";
  
          // Display "Welcome to 2024" after the "Happy New Year" message
          setTimeout(() => {
            welcomeNoteElement.textContent = "Welcome to 2024!";
          }, 2000);
  
          startFireworks();
          
          // Display short note after the fireworks animation
          setTimeout(() => {
            displayShortNote();
          }, 7000);
  
          // Increment the year after the fireworks animation and short note display
          setTimeout(() => {
            year++;
            startCountdown();
          }, 12000);
        } else {
          seconds--;
          setTimeout(updateCountdown, 1000);
        }
      }
  
      updateCountdown();
    }
  
    startCountdown();
  });
  
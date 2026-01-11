const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.btn-spin');

// 1. Destinațiile voastre preferate (le poți schimba oricând)
const destinations = ["Istanbul", "Roma", "Atena", "Budapesta", "Paris", "Praga", "Bali", "Viena"];

// 2. Culorile agregate (Soft Pink și Pale Pink)
const colors = ["#FFB6C1", "#FFF0F5", "#FFB6C1", "#FFF0F5", "#FFB6C1", "#FFF0F5", "#FFB6C1", "#FFF0F5"];

let currentRotation = 0;

// Setăm mărimea desenului să se potrivească cu CSS-ul
canvas.width = 350;
canvas.height = 350;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2;

// 3. Funcția care desenează feliile și scrie orașele
function drawWheel() {
    const sliceAngle = (2 * Math.PI) / destinations.length;

    destinations.forEach((city, i) => {
        const startAngle = i * sliceAngle;
        
        // Desenăm felia
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.fill();
        ctx.stroke();

        // Scriem textul (orașul)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#333"; // Culoare text
        ctx.font = "bold 16px Montserrat";
        ctx.fillText(city, radius - 20, 10);
        ctx.restore();
    });
}

// 4. Logica de învârtire
btn.addEventListener('click', () => {
    // Generăm o rotație aleatorie mare (între 2000 și 5000 grade)
    const extraRotation = Math.floor(Math.random() * 3000) + 2000;
    currentRotation += extraRotation;
    
    // Aplicăm rotația vizuală prin CSS
    canvas.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;
});

// Desenăm roata prima dată când se încarcă pagina
drawWheel();
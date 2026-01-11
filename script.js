const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.btn-spin');
const numeDestinatie = document.getElementById('nume-destinatie');
const linkRezervare = document.getElementById('link-rezervare');

// 1. Pregătim numele (scoatem spațiile)
const numePropriu = "URDEA CLAUDIA NICOLETA".replace(/\s/g, '');
const feliute = numePropriu.split(''); 

// 2. Dicționarul cu toate literele numelui ei
const bazaDateDestinatii = {
    "U": ["Uruguay", "Uganda", "Uzbekistan", "Ucraina", "Ungaria"],
    "R": ["Romania", "Regatul Unit", "Rwanda", "Reunion", "Rusia"],
    "D": ["Danemarca", "Djibouti", "Dominica", "Republica Dominicana", "Dubai"],
    "E": ["Estonia", "Etiopia", "Ecuador", "Egipt", "Elvetia"],
    "A": ["Austria", "Albania", "Algeria", "Andorra", "Angola"],
    "C": ["Cehia", "Croatia", "Cipru", "Canada", "Chile"],
    "L": ["Letonia", "Lituania", "Luxemburg", "Liban", "Laos"],
    "I": ["Italia", "Islanda", "Irlanda", "Indonezia", "India"],
    "N": ["Norvegia", "Namibia", "Nepal", "Nicaragua", "Niger"],
    "O": ["Oman", "Olanda", "Oaxat", "Ontario", "Oslo"],
    "T": ["Turcia", "Tailanda", "Tunisia", "Taiwan", "Tanzania"]
};

const culoriAgreate = ["#FFB6C1", "#FFF0F5"]; 

canvas.width = 350;
canvas.height = 350;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2;
let rotationActuala = 0;

function deseneazaRoata() {
    const unghiFelie = (2 * Math.PI) / feliute.length;

    feliute.forEach((litera, i) => {
        const startUnghi = i * unghiFelie;
        ctx.beginPath();
        ctx.fillStyle = culoriAgreate[i % culoriAgreate.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startUnghi, startUnghi + unghiFelie);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startUnghi + unghiFelie / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#333";
        ctx.font = "bold 14px Montserrat";
        ctx.fillText(litera, radius - 15, 5);
        ctx.restore();
    });
}

btn.addEventListener('click', () => {
    // Învârtim roata
    const rotatieSuplimentara = Math.floor(Math.random() * 3600) + 2000;
    rotationActuala += rotatieSuplimentara;
    
    canvas.style.transition = "transform 5s cubic-bezier(0.15, 0, 0.15, 1)";
    canvas.style.transform = `rotate(${rotationActuala}deg)`;

    // După 5 secunde afișăm litera și butonul de surpriză
    setTimeout(() => {
        const gradeReale = rotationActuala % 360;
        const dimensiuneFelie = 360 / feliute.length;
        const index = Math.floor(((360 - gradeReale + 270) % 360) / dimensiuneFelie);
        const literaCastigatoare = feliute[index];

        const optiuniTari = bazaDateDestinatii[literaCastigatoare];
        const taraFinala = optiuniTari[Math.floor(Math.random() * optiuniTari.length)];

        // Pasul 1: Apare doar litera și butonul "Vezi destinația"
        numeDestinatie.innerHTML = `
            <h3>Litera norocoasă este: <span style="color: #D87093;">${literaCastigatoare}</span></h3>
            <button id="reveal-btn" class="btn-spin" style="margin-top:10px; padding: 10px 20px;">
                Vezi destinația!
            </button>
            <div id="secret-destination" style="display:none; margin-top:15px;">
                <h2 style="color: #D87093;">✈️ ${taraFinala}!</h2>
            </div>
        `;

        // Pasul 2: La click pe butonul nou, apare țara
        document.getElementById('reveal-btn').addEventListener('click', function() {
            this.style.display = 'none';
            document.getElementById('secret-destination').style.display = 'block';
            linkRezervare.href = `https://www.booking.com/searchresults.html?ss=${taraFinala}`;
            linkRezervare.style.display = "inline-block";
        });
    }, 5000);
});

deseneazaRoata();

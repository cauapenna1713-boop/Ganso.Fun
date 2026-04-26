// Rolex Brainrot - Core Logic

const phrases = [
    "O tempo é um Rolex derretendo",
    "O calango sabe demais",
    "SUCO FOI ATIVADO",
    "SHINZOU WO SASAGEYO",
    "Brainrot nível 9000",
    "O Calango Supremo te observa",
    "Beba o suco, torne-se o titã",
    "Tic-tac... o suco está acabando",
    "Rolex de Calango > Patek de Humano",
    "Você foi calangado!",
    "Error: 404 Sense Not Found",
    "Glitch in the matrix (juice edition)"
];

const phraseContainer = document.getElementById('phrase-container');
const btnSuco = document.getElementById('activate-suco');
const sucoMeter = document.getElementById('suco-meter');
const btnMaxBrainrot = document.getElementById('max-brainrot');
const body = document.body;

let sucoLevel = 0;
let isMaxBrainrot = false;

// 1. Random Phrase Generator
function spawnPhrase() {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const el = document.createElement('div');
    el.className = 'floating-phrase';
    el.innerText = phrase;
    
    // Random position
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 50);
    
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    // Random color
    const colors = ['#39FF14', '#BF00FF', '#00FFFF', '#FF3131'];
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    phraseContainer.appendChild(el);
    
    setTimeout(() => {
        el.remove();
    }, 3000);
}

// Spawn phrases periodically
setInterval(() => {
    if (Math.random() > 0.7) spawnPhrase();
}, 1000);

// 2. ATIVAR SUCO Logic
btnSuco.addEventListener('click', () => {
    sucoLevel += 10;
    if (sucoLevel > 100) sucoLevel = 100;
    
    sucoMeter.style.width = `${sucoLevel}%`;
    
    // Visual effects
    body.style.filter = `hue-rotate(${sucoLevel * 3.6}deg) saturate(${1 + sucoLevel/50})`;
    
    // Screen shake
    body.classList.add('shake-active');
    setTimeout(() => body.classList.remove('shake-active'), 500);
    
    // Explosion of phrases
    for(let i=0; i<5; i++) {
        setTimeout(spawnPhrase, i * 100);
    }
    
    if (sucoLevel === 100) {
        btnSuco.innerText = "SUCO CRÍTICO!!!";
        btnSuco.style.animation = "shake 0.05s infinite";
    }
});

// 3. BRAINROT MÁXIMO Toggle
btnMaxBrainrot.addEventListener('click', () => {
    isMaxBrainrot = !isMaxBrainrot;
    body.classList.toggle('max-brainrot');
    
    if (isMaxBrainrot) {
        btnMaxBrainrot.innerText = "PARAR INSANIDADE";
        // Spooky sound effect simulation
        console.log("BRAINROT ACTIVATED");
    } else {
        btnMaxBrainrot.innerText = "BRAINROT MÁXIMO";
    }
});

// 4. Mini-Game: Calango Escape
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-game');
const scoreEl = document.getElementById('score');

let gameRunning = false;
let score = 0;
let calango = { x: 50, y: 150, width: 40, height: 20 };
let obstacles = [];
let frame = 0;

function initGame() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', initGame);
initGame();

function drawCalango() {
    ctx.fillStyle = '#39FF14';
    ctx.fillRect(calango.x, calango.y, calango.width, calango.height);
    // Draw "Rolex" on calango
    ctx.fillStyle = 'gold';
    ctx.fillRect(calango.x + 5, calango.y + 5, 10, 5);
}

function updateGame() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Move calango towards mouse Y
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        calango.y = e.clientY - rect.top - calango.height/2;
    });

    // Spawn obstacles
    if (frame % 60 === 0) {
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30,
            speed: 5 + (score / 10)
        });
    }

    // Update and draw obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= obs.speed;
        ctx.fillStyle = '#FF3131'; // Juice box color
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Collision
        if (
            calango.x < obs.x + obs.width &&
            calango.x + calango.width > obs.x &&
            calango.y < obs.y + obs.height &&
            calango.y + calango.height > obs.y
        ) {
            gameOver();
        }

        // Offscreen
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
            score++;
            scoreEl.innerText = score;
        }
    });

    drawCalango();
    frame++;
    requestAnimationFrame(updateGame);
}

function gameOver() {
    gameRunning = false;
    alert(`GAME OVER! Seu cérebro derreteu com score: ${score}`);
    score = 0;
    scoreEl.innerText = score;
    obstacles = [];
    startBtn.innerText = "RESTART BRAINROT";
}

startBtn.addEventListener('click', () => {
    gameRunning = true;
    startBtn.innerText = "FUGINDO...";
    updateGame();
});

// Easter Egg: Type "ROLEX"
let typed = "";
window.addEventListener('keydown', (e) => {
    typed += e.key.toUpperCase();
    if (typed.length > 5) typed = typed.substring(typed.length - 5);
    
    if (typed === "ROLEX") {
        alert("MODO DEUS ATIVADO: TODOS SÃO CALANGOS AGORA");
        document.querySelectorAll('h2').forEach(el => el.innerText = "CALANGO SUPREMO");
        typed = "";
    }
});

// Log for Devs
console.log("%c ROLEX BRAINROT ", "background: #39FF14; color: #000; font-size: 20px; font-weight: bold;");
console.log("O calango está te observando...");

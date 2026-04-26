// Quest data for the Boss Battle
const quests = [
    {
        q: "Qual o correto para indicar tempo decorrido?",
        options: ["Há cinco anos", "A cinco anos"],
        correct: 0,
        m: "O tempo voa, mas o 'Há' fica! RECEBA!"
    },
    {
        q: "Onde usar o 'Porque' separado e com acento?",
        options: ["Início de pergunta", "Final de frase"],
        correct: 1,
        m: "Final de frase é o Boss Final dos Porquês!"
    },
    {
        q: "Qual dessas é uma mesóclise real?",
        options: ["Dar-te-ei um murro", "Vou te dar um murro"],
        correct: 0,
        m: "Temer ficaria orgulhoso desse vocabulário!"
    },
    {
        q: "Como se escreve o som de alguém rindo no desespero?",
        options: ["Kkkkkk", "Quapaquapaquapa"],
        correct: 0,
        m: "O clássico nunca morre!"
    }
];

let currentQuest = 0;
let Health = 100;

function checkAnswer(idx) {
    const log = document.getElementById('battle-log');
    const healthBar = document.getElementById('boss-health');
    const questionText = document.getElementById('question');
    const optionsDiv = document.querySelector('.options');

    if (idx === quests[currentQuest].correct) {
        Health -= 25;
        healthBar.style.width = Health + '%';
        log.innerHTML = `<span style="color: #00ff00">CRÍTICO!</span> ${quests[currentQuest].m}`;
        
        if (Health <= 0) {
            log.innerHTML = "🏆 VOCÊ DERROTOU O ERRO! Seu QI agora é de 1 Bilhão!";
            document.getElementById('quest-area').innerHTML = "<h3>PARABÉNS, DEUS DA GRAMÁTICA!</h3><p>O Professor está orgulhoso.</p>";
            return;
        }

        currentQuest++;
        if (currentQuest < quests.length) {
            setTimeout(() => {
                loadQuest();
            }, 1000);
        }
    } else {
        log.innerHTML = `<span style="color: #ff0000">ERROU!</span> O Boss ri da sua cara: "Kkkkk, mizeravi!"`;
        // Shake animation
        document.getElementById('battle-ui').classList.add('shake');
        setTimeout(() => document.getElementById('battle-ui').classList.remove('shake'), 500);
    }
}

function loadQuest() {
    const q = quests[currentQuest];
    document.getElementById('question').innerText = q.q;
    const btns = document.querySelectorAll('.option');
    btns[0].innerText = q.options[0];
    btns[1].innerText = q.options[1];
}

// Countdown timer logic
function startTimer() {
    let time = 260; // 4:20
    const display = document.getElementById('countdown');
    
    setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        display.innerText = `${minutes}:${seconds}`;
        time--;
        if (time < 0) time = 260;
    }, 1000);
}

// Spooky Sound Generator using Web Audio API
function playGhostSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 3);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 3);
}

// Payment Handlers
function buyWithMoney() {
    alert("❌ ERRO DE POBREZA DETECTADO: Saldo de R$ 0,02 indisponível. \n\nPor favor, pare de tentar comprar coisas com o dinheiro do lanche!");
}

function buyWithSoul() {
    const overlay = document.getElementById('spooky-overlay');
    const secretPortal = document.getElementById('secret-portal');
    const pricing = document.getElementById('pricing');

    // 1. Play Sound
    playGhostSound();

    // 2. Blackout
    overlay.style.display = 'block';
    
    // 3. Ghost Rain
    for (let i = 0; i < 30; i++) {
        setTimeout(createGhost, i * 100);
    }

    // 4. Reveal Secret after delay
    setTimeout(() => {
        overlay.style.display = 'none';
        pricing.style.display = 'none';
        secretPortal.style.display = 'block';
        secretPortal.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
}

function createGhost() {
    const container = document.querySelector('.ghost-container');
    const ghost = document.createElement('div');
    ghost.className = 'ghost-emoji';
    ghost.innerText = '👻';
    ghost.style.left = Math.random() * 100 + 'vw';
    ghost.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(ghost);
    
    setTimeout(() => ghost.remove(), 4000);
}

// Mark Module as Done
function markAsDone(btn) {
    btn.classList.toggle('done');
    if (btn.classList.contains('done')) {
        btn.innerText = 'CONCLUÍDO! RECEBA! ✅';
        confettiEffect();
    } else {
        btn.innerText = 'MARCAR COMO ASSISTIDO 🗸';
    }
}

function confettiEffect() {
    // Simple visual reward
    console.log("Aula concluída! +10 QI");
}

// Initialize
window.onload = () => {
    startTimer();
    console.log("Português Supremo 2.0 carregado com sucesso! IPPOOOO!");
};

// Add CSS for shake animation via JS for simplicity or in style.css
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
    .shake { animation: shake 0.5s; }
`;
document.head.appendChild(style);

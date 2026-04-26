// Ganso Voting Pro - Core Logic (API Version)

// --- CONFIGURATION ---
const API_BASE_URL = 'http://localhost:3000/api'; // Mude para a URL do seu deploy depois!

// --- UI ELEMENTS ---
const elements = {
    userDisplay: document.getElementById('user-display'),
    authOverlay: document.getElementById('auth-overlay'),
    authTitle: document.getElementById('auth-title'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    authSubmitBtn: document.getElementById('auth-submit-btn'),
    toggleAuthLink: document.getElementById('toggle-auth-link'),
    closeAuthBtn: document.getElementById('close-auth'),
    
    createPollSection: document.getElementById('create-poll-section'),
    guestMsg: document.getElementById('guest-msg'),
    guestLoginBtn: document.getElementById('guest-login-btn'),
    
    optionsContainer: document.getElementById('options-container'),
    addOptionBtn: document.getElementById('add-option'),
    createPollBtn: document.getElementById('create-poll-btn'),
    pollsList: document.getElementById('polls-list')
};

let currentUser = JSON.parse(localStorage.getItem('ganso_session')) || null;
let isRegisterMode = false;

// --- API FETCHERS ---
async function apiFetch(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);
    
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Erro na API');
        }
        return await res.json();
    } catch (err) {
        console.error(err);
        alert(err.message);
        return null;
    }
}

// --- AUTH LOGIC ---
function updateAuthUI() {
    if (currentUser) {
        elements.userDisplay.innerHTML = `
            <span class="username-label">${currentUser.username}${currentUser.isAdmin ? ' (ADM)' : ''}</span>
            <span class="btn-logout" onclick="logout()">Sair</span>
        `;
        elements.createPollSection.classList.remove('hidden');
        elements.guestMsg.classList.add('hidden');
    } else {
        elements.userDisplay.innerHTML = `<button class="btn-primary" onclick="showAuth(false)">ENTRAR</button>`;
        elements.createPollSection.classList.add('hidden');
        elements.guestMsg.classList.remove('hidden');
    }
    loadPolls();
}

function showAuth(register = false) {
    isRegisterMode = register;
    elements.authTitle.innerText = isRegisterMode ? 'Registrar' : 'Entrar';
    elements.authSubmitBtn.innerText = isRegisterMode ? 'REGISTRAR' : 'ENTRAR';
    elements.toggleAuthLink.innerText = isRegisterMode ? 'Entrar' : 'Registrar-se';
    elements.authOverlay.classList.remove('hidden');
}

elements.toggleAuthLink.onclick = () => showAuth(!isRegisterMode);
elements.closeAuthBtn.onclick = () => elements.authOverlay.classList.add('hidden');
elements.guestLoginBtn.onclick = () => showAuth(false);

elements.authSubmitBtn.onclick = async () => {
    const username = elements.usernameInput.value.trim();
    const password = elements.passwordInput.value.trim();
    
    const endpoint = isRegisterMode ? '/register' : '/login';
    const result = await apiFetch(endpoint, 'POST', { username, password });
    
    if (result && result.success) {
        currentUser = result.user;
        localStorage.setItem('ganso_session', JSON.stringify(currentUser));
        elements.authOverlay.classList.add('hidden');
        updateAuthUI();
    }
};

function logout() {
    currentUser = null;
    localStorage.removeItem('ganso_session');
    updateAuthUI();
}

// --- POLL LOGIC ---
async function loadPolls() {
    const polls = await apiFetch('/polls');
    if (polls) renderPolls(polls);
}

function renderPolls(polls) {
    elements.pollsList.innerHTML = '';
    polls.forEach((poll) => {
        const canDelete = currentUser && (currentUser.isAdmin || currentUser.username === poll.creator);
        
        const pollEl = document.createElement('div');
        pollEl.className = 'poll-card';
        
        const optionsHtml = poll.options.map((opt, oIdx) => {
            const hasVoted = poll.votes[currentUser?.username]?.includes(oIdx);
            return `
                <button class="vote-btn ${hasVoted ? 'active' : ''}" onclick="handleVote(${poll.id}, ${oIdx})">
                    <span>${opt}</span>
                    <span class="vote-count">${getOptionVoteCount(poll, oIdx)}</span>
                </button>
            `;
        }).join('');

        pollEl.innerHTML = `
            <div class="poll-header">
                <div class="poll-question">${poll.question}</div>
                ${canDelete ? `<button class="btn-danger" onclick="deletePoll(${poll.id})">DELETAR</button>` : ''}
            </div>
            <div class="options-grid">${optionsHtml}</div>
            <div class="poll-meta">
                <span class="poll-type-badge">${poll.isMultiple ? 'Múltipla Escolha' : 'Escolha Única'}</span>
                Criado por ${poll.creator}
            </div>
        `;
        elements.pollsList.appendChild(pollEl);
    });
}

function getOptionVoteCount(poll, oIdx) {
    let count = 0;
    Object.values(poll.votes).forEach(userVotes => {
        if (userVotes.includes(oIdx)) count++;
    });
    return count;
}

async function handleVote(pollId, optionIndex) {
    if (!currentUser) return showAuth(false);
    
    const result = await apiFetch(`/polls/${pollId}/vote`, 'POST', {
        username: currentUser.username,
        optionIndex
    });
    
    if (result) loadPolls();
}

async function deletePoll(pollId) {
    if (confirm("Tem certeza que deseja deletar esta votação?")) {
        const result = await apiFetch(`/polls/${pollId}?username=${currentUser.username}`, 'DELETE');
        if (result && result.success) loadPolls();
    }
}

elements.addOptionBtn.onclick = () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'poll-option-input';
    input.placeholder = `Opção ${elements.optionsContainer.children.length + 1}`;
    elements.optionsContainer.appendChild(input);
};

elements.createPollBtn.onclick = async () => {
    const question = document.getElementById('poll-question').value.trim();
    const optionInputs = document.querySelectorAll('.poll-option-input');
    const options = Array.from(optionInputs).map(i => i.value.trim()).filter(v => v !== '');
    const isMultiple = document.getElementById('multiple-choice').checked;

    if (question && options.length >= 2) {
        const result = await apiFetch('/polls', 'POST', {
            question,
            options,
            isMultiple,
            creator: currentUser.username
        });
        
        if (result) {
            // Reset
            document.getElementById('poll-question').value = '';
            elements.optionsContainer.innerHTML = `
                <input type="text" class="poll-option-input" placeholder="Opção 1">
                <input type="text" class="poll-option-input" placeholder="Opção 2">
            `;
            loadPolls();
        }
    } else {
        alert("Preencha a pergunta e pelo menos 2 opções!");
    }
};

// --- INIT ---
updateAuthUI();
// Polling for real-time updates (optional)
setInterval(loadPolls, 5000); 

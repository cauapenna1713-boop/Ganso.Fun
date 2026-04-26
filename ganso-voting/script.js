// Ganso Voting Pro - Supabase Version 🦢🔥

// --- CONFIGURATION ---
// VOCÊ PRECISA COLOCAR SEU URL E KEY AQUI DEPOIS DE CRIAR O PROJETO NO SUPABASE!
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA-ANON-KEY-AQUI';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
    
    if (isRegisterMode) {
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, password, isAdmin: false }])
            .select();
            
        if (error) return alert("Erro ao registrar: " + error.message);
        currentUser = data[0];
    } else {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
            
        if (error || !data) return alert("Usuário ou senha incorretos!");
        currentUser = data;
    }
    
    localStorage.setItem('ganso_session', JSON.stringify(currentUser));
    elements.authOverlay.classList.add('hidden');
    updateAuthUI();
};

function logout() {
    currentUser = null;
    localStorage.removeItem('ganso_session');
    updateAuthUI();
}

// --- POLL LOGIC ---
async function loadPolls() {
    // Carrega enquetes e votos
    const { data: polls, error } = await supabase
        .from('polls')
        .select('*, votes(*)');
        
    if (error) return console.error(error);
    renderPolls(polls);
}

function renderPolls(polls) {
    elements.pollsList.innerHTML = '';
    // Ordenar por data (mais recentes primeiro)
    polls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    polls.forEach((poll) => {
        const canDelete = currentUser && (currentUser.isAdmin || currentUser.username === poll.creator);
        
        const pollEl = document.createElement('div');
        pollEl.className = 'poll-card';
        
        const optionsHtml = poll.options.map((opt, oIdx) => {
            const userVotes = poll.votes.find(v => v.username === currentUser?.username);
            const hasVoted = userVotes?.option_indices.includes(oIdx);
            const voteCount = poll.votes.filter(v => v.option_indices.includes(oIdx)).length;

            return `
                <button class="vote-btn ${hasVoted ? 'active' : ''}" onclick="handleVote('${poll.id}', ${oIdx})">
                    <span>${opt}</span>
                    <span class="vote-count">${voteCount}</span>
                </button>
            `;
        }).join('');

        pollEl.innerHTML = `
            <div class="poll-header">
                <div class="poll-question">${poll.question}</div>
                ${canDelete ? `<button class="btn-danger" onclick="deletePoll('${poll.id}')">DELETAR</button>` : ''}
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

async function handleVote(pollId, optionIndex) {
    if (!currentUser) return showAuth(false);
    
    // 1. Pega voto atual do usuário para esta enquete
    const { data: currentVote, error: fetchError } = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', pollId)
        .eq('username', currentUser.username)
        .single();

    let newIndices = currentVote ? [...currentVote.option_indices] : [];
    const poll = (await supabase.from('polls').select('*').eq('id', pollId).single()).data;

    const existingIndex = newIndices.indexOf(optionIndex);
    
    if (existingIndex !== -1) {
        newIndices.splice(existingIndex, 1);
    } else {
        if (!poll.isMultiple) {
            newIndices = [optionIndex];
        } else {
            newIndices.push(optionIndex);
        }
    }

    if (currentVote) {
        await supabase.from('votes').update({ option_indices: newIndices }).eq('id', currentVote.id);
    } else {
        await supabase.from('votes').insert([{ 
            poll_id: pollId, 
            username: currentUser.username, 
            option_indices: newIndices 
        }]);
    }
    
    loadPolls();
}

async function deletePoll(pollId) {
    if (confirm("Tem certeza que deseja deletar esta votação?")) {
        await supabase.from('votes').delete().eq('poll_id', pollId);
        await supabase.from('polls').delete().eq('id', pollId);
        loadPolls();
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
        const { error } = await supabase.from('polls').insert([{
            question,
            options,
            isMultiple,
            creator: currentUser.username
        }]);
        
        if (!error) {
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

// Real-time listener (Opcional: substitui o setInterval)
supabase.channel('custom-all-channel')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'polls' }, loadPolls)
  .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, loadPolls)
  .subscribe();

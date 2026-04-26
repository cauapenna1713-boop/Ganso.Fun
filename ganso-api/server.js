const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper: Read/Write Database
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        const initialDB = { users: [{ username: 'admin', password: '123', isAdmin: true }], polls: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
        return initialDB;
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- ROUTES ---

// 1. Auth: Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, user: { username: user.username, isAdmin: user.isAdmin } });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

// 2. Auth: Register
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    
    if (db.users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }
    
    const newUser = { username, password, isAdmin: false };
    db.users.push(newUser);
    writeDB(db);
    res.json({ success: true, user: { username: newUser.username, isAdmin: false } });
});

// 3. Polls: List
app.get('/api/polls', (req, res) => {
    const db = readDB();
    res.json(db.polls);
});

// 4. Polls: Create
app.post('/api/polls', (req, res) => {
    const { question, options, isMultiple, creator } = req.body;
    const db = readDB();
    
    const newPoll = {
        id: Date.now(),
        question,
        options,
        isMultiple,
        creator,
        votes: {},
        createdAt: new Date().toISOString()
    };
    
    db.polls.unshift(newPoll);
    writeDB(db);
    res.json(newPoll);
});

// 5. Polls: Vote
app.post('/api/polls/:id/vote', (req, res) => {
    const pollId = parseInt(req.params.id);
    const { username, optionIndex } = req.body;
    const db = readDB();
    
    const poll = db.polls.find(p => p.id === pollId);
    if (!poll) return res.status(404).json({ message: 'Votação não encontrada' });
    
    if (!poll.votes[username]) poll.votes[username] = [];
    const userVotes = poll.votes[username];
    const existingIndex = userVotes.indexOf(optionIndex);
    
    if (existingIndex !== -1) {
        userVotes.splice(existingIndex, 1);
    } else {
        if (!poll.isMultiple) {
            poll.votes[username] = [optionIndex];
        } else {
            userVotes.push(optionIndex);
        }
    }
    
    writeDB(db);
    res.json(poll);
});

// 6. Polls: Delete
app.delete('/api/polls/:id', (req, res) => {
    const pollId = parseInt(req.params.id);
    const { username } = req.query; // Simple permission check
    const db = readDB();
    
    const user = db.users.find(u => u.username === username);
    const pollIndex = db.polls.findIndex(p => p.id === pollId);
    
    if (pollIndex === -1) return res.status(404).json({ message: 'Votação não encontrada' });
    
    const poll = db.polls[pollIndex];
    const isAdmin = user && user.isAdmin;
    const isCreator = poll.creator === username;
    
    if (isAdmin || isCreator) {
        db.polls.splice(pollIndex, 1);
        writeDB(db);
        res.json({ success: true });
    } else {
        res.status(403).json({ message: 'Sem permissão' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Ganso API rodando na porta ${PORT}`);
});

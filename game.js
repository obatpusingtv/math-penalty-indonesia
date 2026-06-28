// State Game & UI Logic
const qManager = new QuestionManager();
let state = { lives: 3, score: 0, coins: 0, combo: 1 };
let isAnimating = false;

// Elemen DOM
const el = {
    qText: document.getElementById('question-text'),
    options: document.getElementById('options-container'),
    lives: document.getElementById('lives'),
    score: document.getElementById('score'),
    coins: document.getElementById('coins'),
    combo: document.getElementById('combo'),
    ball: document.getElementById('ball'),
    player: document.getElementById('player'),
    keeper: document.getElementById('goalkeeper'),
    feedback: document.getElementById('feedback')
};

async function initGame() {
    await qManager.loadQuestions(1); // Default kelas 1
    updateHUD();
    renderQuestion();
}

function updateHUD() {
    el.lives.innerText = state.lives;
    el.score.innerText = state.score;
    el.coins.innerText = state.coins;
    el.combo.innerText = `x${state.combo}`;
}

function renderQuestion() {
    isAnimating = false;
    const q = qManager.getQuestion();
    el.qText.innerText = q.q;
    el.options.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(opt);
        el.options.appendChild(btn);
    });

    // Reset posisi animasi
    el.ball.className = 'ball';
    el.keeper.className = 'character goalkeeper';
    el.player.className = 'character player';
    el.feedback.classList.add('hidden');
}

function handleAnswer(selected) {
    if(isAnimating) return;
    isAnimating = true;

    const isCorrect = qManager.checkAnswer(selected);
    el.player.classList.add('anim-kick');

    setTimeout(() => {
        if(isCorrect) {
            triggerGoal();
        } else {
            triggerSave();
        }
    }, 300); // Waktu animasi tendang
}

function triggerGoal() {
    el.ball.classList.add('anim-goal');
    showFeedback("GOL! ⚽", "#58cc02");
    
    state.score += (10 * state.combo);
    state.coins += 5;
    state.combo++;
    updateHUD();

    setTimeout(renderQuestion, 2000);
}

function triggerSave() {
    el.ball.classList.add('anim-save');
    el.keeper.classList.add('anim-keeper-jump');
    showFeedback("DITANGKAP! ❌", "#ff4b4b");
    
    state.lives--;
    state.combo = 1;
    updateHUD();

    if(state.lives <= 0) {
        setTimeout(() => alert(`Game Over! Score: ${state.score}`), 1000); // Ganti dengan UI Game Over
    } else {
        setTimeout(renderQuestion, 2000);
    }
}

function showFeedback(text, color) {
    el.feedback.innerText = text;
    el.feedback.style.color = color;
    el.feedback.classList.remove('hidden');
}

window.onload = initGame;
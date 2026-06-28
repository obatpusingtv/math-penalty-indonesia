// Mengelola Data Soal
class QuestionManager {
    constructor() {
        this.questions = [];
        this.currentQuestion = null;
    }

    async loadQuestions(kelas) {
        try {
            // Simulasi fetch database (Dalam produksi, fetch dari data/kelas1.json)
            const response = await fetch(`data/kelas${kelas}.json`);
            this.questions = await response.json();
            this.shuffleQuestions();
        } catch (error) {
            console.error("Gagal memuat soal, menggunakan fallback", error);
            // Fallback sistem jika berjalan tanpa server lokal
            this.generateFallbackQuestions(); 
        }
    }

    generateFallbackQuestions() {
        // Generator soal dinamis untuk memastikan game selalu berjalan
        this.questions = [];
        for(let i=0; i<100; i++) {
            let a = Math.floor(Math.random() * 20) + 1;
            let b = Math.floor(Math.random() * 20) + 1;
            let ans = a + b;
            let options = [ans, ans+1, ans-2, ans+3].sort(() => Math.random() - 0.5);
            this.questions.push({ q: `${a} + ${b} = ?`, options: options, answer: ans });
        }
    }

    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
    }

    getQuestion() {
        if(this.questions.length === 0) this.shuffleQuestions(); // Loop soal jika habis
        this.currentQuestion = this.questions.pop();
        return this.currentQuestion;
    }

    checkAnswer(selected) {
        return parseInt(selected) === this.currentQuestion.answer;
    }
}
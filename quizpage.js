class QuizPage {
    constructor(quizData) {
        this.id = quizData.id;
        this.title = quizData.title;
        this.description = quizData.description;
        this.questions = quizData.questions.map(question => new Quiz(question));
    }

    displayQuiz() {
        console.log(`Quiz ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.description}`);
        this.questions.forEach(question => question.displayQuestion());
    }
}

// Example usage
const quizData = {
    // ... JSON data ...
};

const quizPage = new QuizPage(quizData);
quizPage.displayQuiz(); 
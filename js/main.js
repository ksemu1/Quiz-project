const questions = [
    {
        question: "Какой язык используется для создания структуры сайта?",
        answers: ["HTML", "CSS", "Python", "Photoshop"],
        correct: 0
    },
    {
        question: "Какой язык отвечает за стили сайта?",
        answers: ["Java", "CSS", "C++", "PHP"],
        correct: 1
    },
    {
        question: "Что используется для интерактивности сайта?",
        answers: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "Как называется таблица стилей?",
        answers: ["JavaScript", "CSS", "HTML", "Node.js"],
        correct: 1
    },
    {
        question: "Какой тег создаёт заголовок первого уровня?",
        answers: ["<h1>", "<p>", "<div>", "<a>"],
        correct: 0
    },
    {
        question: "Какой метод выводит сообщение в консоль?",
        answers: ["print()", "echo()", "console.log()", "write()"],
        correct: 2
    },
    {
        question: "Какой тег создаёт ссылку?",
        answers: ["<img>", "<a>", "<ul>", "<table>"],
        correct: 1
    },
    {
        question: "Что означает CSS?",
        answers: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Какой символ используется для id в CSS?",
        answers: [".", "#", "*", "&"],
        correct: 1
    },
    {
        question: "Как называется язык программирования браузера?",
        answers: ["Java", "Python", "JavaScript", "C#"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => selectAnswer(index, button));

        answersElement.appendChild(button);
    });

    updateProgress();
}

function selectAnswer(index, button) {
    const correctAnswer = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.add("correct");
        }

        if (i === index && i !== correctAnswer) {
            btn.classList.add("wrong");
        }
    });

    if (index === correctAnswer) {
        score++;
    }
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function updateProgress() {
    const progress = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    progressBar.style.width = "100%";

    document.getElementById("score").textContent =
        `Вы набрали ${score} из ${questions.length} баллов.`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("result-box").classList.add("hidden");

    showQuestion();
}

showQuestion();

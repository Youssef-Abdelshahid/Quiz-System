// Mock Quiz Data (with added explanations)
const mockQuizData = [
    {
        "name": "Basic Science Quiz",
        "description": "This quiz tests general scientific knowledge.",
        "category": "Science",
        "difficulty": "Medium",
        "questions": [
            {
                "questionText": "What is the chemical symbol for gold?",
                "questionType": "mcq",
                "options": ["Ag", "Au", "Pb", "Fe"],
                "correctAnswer": "Au",
                "marks": 2,
                "explanation": "Gold's symbol Au comes from its Latin name 'Aurum'."
            },
            {
                "questionText": "How many planets are in the Solar System?",
                "questionType": "mcq",
                "options": ["7", "8", "9", "10"],
                "correctAnswer": "8",
                "marks": 2,
                "explanation": "There are 8 planets since Pluto was reclassified as a dwarf planet in 2006."
            },
            {
                "questionText": "True or False: Sound travels faster in air than in water.",
                "questionType": "truefalse",
                "options": ["True", "False"],
                "correctAnswer": "False",
                "marks": 1,
                "explanation": "Sound travels about 4 times faster in water (1,480 m/s) than in air (343 m/s)."
            },
            {
                "questionText": "Which gas do plants absorb during photosynthesis?",
                "questionType": "mcq",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "correctAnswer": "Carbon Dioxide",
                "marks": 2,
                "explanation": "Plants absorb CO₂ and release oxygen during photosynthesis."
            },
            {
                "questionText": "What is the powerhouse of the cell?",
                "questionType": "mcq",
                "options": ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                "correctAnswer": "Mitochondria",
                "marks": 2,
                "explanation": "Mitochondria generate most of the cell's supply of ATP, used as energy."
            }
        ]
    }
];

// Quiz State
let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let selectedQuiz = mockQuizData[currentQuizIndex];
let selectedAnswer = null;
let userAnswers = [];

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const quizPage = document.getElementById('quiz-page');
const quizResults = document.getElementById('quiz-results');
const scoreDisplay = document.getElementById('score-display');
const totalPossibleDisplay = document.getElementById('total-possible');
const resultsContainer = document.getElementById('results-container');
const retakeButton = document.getElementById('retake-button');
// const homeButton = document.getElementById('home-button');

// Initialize Quiz
function startQuiz() {
    loadQuestion();
    updateNavigationButtons();
    updateProgress();
}

// Load Current Question
function loadQuestion() {
    const question = selectedQuiz.questions[currentQuestionIndex];
    questionText.textContent = question.questionText;
    optionsContainer.innerHTML = '';
    
    // Set grid class based on number of options
    optionsContainer.className = 'options-grid';
    if (question.options.length === 2) {
        optionsContainer.classList.add('two-options');
    } else {
        optionsContainer.classList.add('four-options');
    }

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            selectAnswer(option);
        });
        optionsContainer.appendChild(optionElement);
    });

    // Restore selected answer if user goes back
    if (userAnswers[currentQuestionIndex]) {
        const selectedOption = Array.from(optionsContainer.children).find(
            opt => opt.textContent === userAnswers[currentQuestionIndex].userAnswer
        );
        if (selectedOption) {
            selectedOption.classList.add('selected');
            selectedAnswer = userAnswers[currentQuestionIndex].userAnswer;
        }
    } else {
        selectedAnswer = null;
    }
}

// Handle Answer Selection
function selectAnswer(answer) {
    selectedAnswer = answer;
    userAnswers[currentQuestionIndex] = {
        question: selectedQuiz.questions[currentQuestionIndex].questionText,
        userAnswer: answer,
        correctAnswer: selectedQuiz.questions[currentQuestionIndex].correctAnswer,
        isCorrect: answer === selectedQuiz.questions[currentQuestionIndex].correctAnswer
    };
}

// Submit Answer and Move to Next Question
function submitAnswer() {
    if (selectedAnswer === null) {
        alert("Please select an answer before proceeding.");
        return false;
    }

    const question = selectedQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        score += question.marks;
    }
    return true;
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${selectedQuiz.questions.length}`;
}

// Update Navigation Buttons
function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === selectedQuiz.questions.length - 1;
    finishButton.style.display = currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'block' : 'none';
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        const answerSubmitted = submitAnswer();
        if (answerSubmitted) {
            currentQuestionIndex++;
            loadQuestion();
            updateNavigationButtons();
            updateProgress();
        }
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateNavigationButtons();
        updateProgress();
    }
}

// Show Quiz Results
function showResults() {
    quizPage.style.display = 'none';
    quizResults.style.display = 'flex';
    
    const totalPossible = selectedQuiz.questions.reduce((total, question) => total + question.marks, 0);
    scoreDisplay.textContent = score;
    totalPossibleDisplay.textContent = totalPossible;
    
    resultsContainer.innerHTML = '';
    
    selectedQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || { 
            userAnswer: 'Skipped', 
            isCorrect: false 
        };
        
        const resultElement = document.createElement('div');
        resultElement.className = `question-result ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        resultElement.innerHTML = `
            <div class="result-question">${index + 1}. ${question.questionText}</div>
            <div class="result-answer ${userAnswer.isCorrect ? 'correct' : 'incorrect'}">
                Your answer: ${userAnswer.userAnswer}
                ${!userAnswer.isCorrect ? `<br>Correct answer: ${question.correctAnswer}` : ''}
            </div>
            ${question.explanation ? `<div class="result-explanation">${question.explanation}</div>` : ''}
        `;
        
        resultsContainer.appendChild(resultElement);
    });
}

// Finish Quiz
function finishQuiz() {
    const answerSubmitted = submitAnswer();
    if (answerSubmitted) {
        showResults();
    }
}

// Retake Quiz
function retakeQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    
    // Show quiz and hide results
    quizResults.style.display = 'none';
    quizPage.style.display = 'flex';
    
    // Restart quiz
    startQuiz();
}

function showResults() {
    quizPage.style.display = 'none';
    quizResults.style.display = 'flex';
    
    const totalPossible = selectedQuiz.questions.reduce((total, question) => total + question.marks, 0);
    scoreDisplay.textContent = score;
    totalPossibleDisplay.textContent = totalPossible;
    
    resultsContainer.innerHTML = '';
    
    selectedQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || { 
            userAnswer: 'Skipped', 
            isCorrect: false 
        };
        
        const resultElement = document.createElement('div');
        resultElement.className = `question-result ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        resultElement.innerHTML = `
            <div class="result-question">${index + 1}. ${question.questionText}</div>
            <div class="result-answer ${userAnswer.isCorrect ? 'correct' : 'incorrect'}">
                Your answer: ${userAnswer.userAnswer}
                ${!userAnswer.isCorrect ? `<br>Correct answer: ${question.correctAnswer}` : ''}
            </div>
            ${question.explanation ? `<div class="result-explanation">${question.explanation}</div>` : ''}
        `;
        
        resultsContainer.appendChild(resultElement);
    });
}



// Update Event Listeners
// Event Listeners
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
finishButton.addEventListener('click', finishQuiz);
retakeButton.addEventListener('click', retakeQuiz);
document.getElementById('home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Start the Quiz
startQuiz();

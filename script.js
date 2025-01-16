const questions = [
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h1", correct: false},
            { text: "h6", correct: true},
            { text: "h4", correct: false},
            { text: "h5", correct: false},
        ]
    },
    {
        question: "What are the attributes used to change the size of an image?",
        answers: [
            { text: "Width and height", correct: true},
            { text: "Top and bottom", correct: false},
            { text: "Big and Small", correct: false},
            { text: "None of the above", correct: false},
        ]  
    },
    {
        question: "What are the main components of the front end of any working website?",
        answers: [
            { text: "HTML only", correct: false},
            { text: "Javascript only", correct: false},
            { text: "HTML, CSS, Javascript", correct: true},
            { text: "Node.js.", correct: false},
        ]
    },
    {
        question: "What are those objects called which are used for storing data on the client provided by the HTML local storage?",
        answers: [
            { text: "Windows.localStorage", correct: false},
            { text: "Window.sessionStorage", correct: false},
            { text: "Both a and b", correct: true},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            { text: "HighText Markup Language.", correct: false},
            { text: "HyperText Markup Language", correct: true},
            { text: "HyperText Markdown Language.", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "What are some valid character sets available?",
        answers: [
            { text: "UTF-8", correct: false},
            { text: "ANSI", correct: false},
            { text: "ASCII", correct: false},
            { text: "All of the above", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


const questionText = document.querySelector('.question-text');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const questionTotal = document.querySelector('.question-total');
const headerScore = document.querySelector('.header-score');


startBtn.addEventListener('click', function () {
    popupInfo.classList.add('active');
    main.classList.add('active');

});

exitBtn.addEventListener('click', function () {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
});

continueBtn.addEventListener('click', function () {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestions(0);
    questionCounter(1);

});


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
headerScoreFunc();

nextBtn.addEventListener('click', function () {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        // console.log('quests completed!');
        showResultBox();

    }

});

// getting questions and options from array:
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                     <div class="option"><span>${questions[index].options[2]}</span></div>
                     <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');

    options.forEach(function (option) {
        // console.log(option);
        option.addEventListener('click', optionSelected.bind(this));
        // option.addEventListener('click', function(e){
        //     console.log(this);
        // });

    })


}

function questionCounter(index) {
    questionTotal.textContent = `${questionNumb} of ${questions.length}`;
}

function optionSelected(e) {
    // console.log(e.target.textContent);
    // console.log(e.target);
    // console.log(e.target.closest('.option'));
    const answer = e.target.closest('.option');
    const userAnswer = e.target.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptionsLength = optionList.children.length;



    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScoreFunc();

    } else {
        answer.classList.add('incorrect');

        // auto select currect answe:
        for (let option of optionList.children) {
            // console.log(option.firstChild.innerHTML);
            // console.log(userAnswer);
            if (correctAnswer === option.firstChild.innerHTML) {
                option.classList.add('correct');
            }
        }


    }

    // if user hase select answer, desabale all options:

    // console.dir(optionList);
    // console.log(optionList);
    // console.log(allOptionsLength);
    // console.dir(optionList.children);

    // optionList.children.forEach(option=> option.style.pointerEvents = 'none');

    for (let option of optionList.children) {
        option.classList.add('disable');
    }

    nextBtn.classList.add('active');


}

function headerScoreFunc() {
    headerScore.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const socreText = document.querySelector('.score-text');
    socreText.textContent = `Your Score is ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;

    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        // console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;

        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }

    }, speed);

}


tryAgainBtn.addEventListener('click', function () {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScoreFunc();
    

});


goHomeBtn.addEventListener('click', function(){

    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScoreFunc();

})
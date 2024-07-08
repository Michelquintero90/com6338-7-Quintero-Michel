var questionsArr = [
    {
      question: 'Who created JavaScript?',
      answer: 'Brendan Eich',
      options: [
        'Linus Torvalds',
        'Brendan Eich',
        'Dan Abramov',
        'Douglas Crockford',
      ]
    },
    {
      question: 'What does CSS stand for?',
      answer: 'Cascading Style Sheets',
      options: [
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Computer Style Sheets',
        'Colorful Style Sheets',
      ]
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      options: [
        'Berlin',
        'Paris',
        'Madrid',
        'Rome',
      ]
    },
    {
      question: 'What does HTML stand for?',
      answer: 'Hypertext Markup Language',
      options: [
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language',
        'Hypertext Markup Language',
        'Hyper Text Markup Leveler',
      ]
    },
    {
      question: 'Who is the CEO of Tesla?',
      answer: 'Elon Musk',
      options: [
        'Jeff Bezos',
        'Bill Gates',
        'Elon Musk',
        'Mark Zuckerberg',
      ]
    },
  ];
  
  function startQuiz() {
    var quizContainer = document.getElementById('quiz');
    
    var previousScore = localStorage.getItem('previous-score');
    if (previousScore !== null) {
      quizContainer.innerHTML = `
        <div>
          <p>Previous Score: ${previousScore}%</p>
          <button id="start-quiz">Start Quiz!</button>
        </div>
      `;
      quizContainer.querySelector('#start-quiz').addEventListener('click', startGame);
    } else {
      var startQuizButton = document.createElement('button');
      startQuizButton.textContent = 'Start Quiz!';
      startQuizButton.id = 'start-quiz';
      quizContainer.appendChild(startQuizButton);
  
      startQuizButton.addEventListener('click', startGame);
    }
  }
  
  function startGame() {
    var quizContainer = document.getElementById('quiz');
    var currentQuestionIndex = 0;
  
    function displayQuestion() {
      var currentQuestion = questionsArr[currentQuestionIndex];
      var questionHTML = `
        <p>${currentQuestion.question}</p>
        <div>
          ${currentQuestion.options.map(option => `<button>${option}</button>`).join('')}
        </div>
        <p id="timer">30</p>
      `;
      quizContainer.innerHTML = questionHTML;
  
      var secondsLeft = 30;
      var timerDisplay = document.getElementById('timer');
      timerDisplay.textContent = secondsLeft;
  
      var timerInterval = setInterval(function() {
        secondsLeft--;
        timerDisplay.textContent = secondsLeft;
        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          goToNextQuestion();
        }
      }, 1000);
  
      var optionButtons = quizContainer.querySelectorAll('button');
      optionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          clearInterval(timerInterval);
          goToNextQuestion();
        });
      });
    }
  
    function goToNextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questionsArr.length) {
        displayQuestion();
      } else {
        var score = calculateScore();
        quizContainer.innerHTML = `
          <div>
            <p>Your Score: ${score}%</p>
            <button id="start-quiz">Start Quiz!</button>
          </div>
        `;
        localStorage.setItem('previous-score', score);
        quizContainer.querySelector('#start-quiz').addEventListener('click', startGame);
      }
    }
  
    function calculateScore() {
      var correctAnswers = 0;
      questionsArr.forEach(function(question) {
        var selectedAnswer = quizContainer.querySelector('button.clicked');
        if (selectedAnswer && selectedAnswer.textContent === question.answer) {
          correctAnswers++;
        }
      });
      return Math.round((correctAnswers / questionsArr.length) * 100);
    }
  
    displayQuestion();
  }
  
  startQuiz();
  
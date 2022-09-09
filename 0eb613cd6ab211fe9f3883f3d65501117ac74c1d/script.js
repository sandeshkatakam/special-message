const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]

var images = ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    index  = 0,
    $top   = $('#top-area');

setInterval(function() {
   $top.animate({ opacity: 0 }, 500, function() {
     $top.css('background-image', 'url('+images[++index]+')');
     $top.animate({ opacity: 1 }, 500, function() {
       if(index === images.length) index = 0;
     });
   });
}, 6000);

gsap.registerPlugin(SplitText);

var tl = gsap.timeline(),
  mySplitText = new SplitText("#quote", { type: "words,chars" }),
  chars = mySplitText.chars; //an array of all the divs that wrap each character

gsap.set("#quote", { perspective: 400 });

console.log(chars);

tl.from(chars, {
  duration: 0.8,
  opacity: 0,
  scale: 0,
  y: 80,
  rotationX: 180,
  transformOrigin: "0% 50% -50",
  ease: "back",
  stagger: 0.01
});

document.getElementById("animate").onclick = function () {
  tl.restart();
};

console.clear();

var el = document.querySelector('blockquote');


var s = new SplitText(
  el, 
  {
    type:"lines, words", 
    linesClass:"ts-line"
  }
);

var tl = new TimelineMax({ 
  delay: 0.5,
  repeatDelay: 0.5,
  repeat: -1
});

tl.addLabel('enter');

tl.staggerFromTo(
    s.words, 
    0.6, 
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: 'Circ.easeOut'
    },
    0.2,
    'enter'
  );

tl.staggerFromTo(
    s.words, 
    0.6, 
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: 'Power1.easeOut'
    },
    0.2,
  'enter'
  );


tl.fromTo('.note', 1, { opacity: 0 },{ opacity: 0.6, ease: 'Linear.easeNone' });
tl.addPause();

tl.addLabel('exit');

tl.to('.note', 0.5, { opacity: 0, ease: 'Linear.easeNone' });

tl.staggerTo(
    s.words, 
    0.4, 
    {
      yPercent: -200,
      ease: 'Circ.easeIn'
    }, 
    0.1,
    'exit'
  );

tl.staggerTo(
    s.words, 
    0.4, 
    {
      opacity: 0,
      ease: 'Power1.easeIn'
    }, 
    0.1,
    'exit'
  );

el.addEventListener('click',function(){
  console.log('click!');
  tl.play(); // tl.reversed() ? tl.play() : tl.reverse()
});
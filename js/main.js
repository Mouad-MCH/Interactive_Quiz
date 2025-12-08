
/*---------------------- *\
 * - Quistion
\* --------------------- */

let questions_Html = [
    {
        question: "Que signifie HTML ?",
        answers: [
            {text: "Hyperlinks and Text Markup language " , correct: false},
            {text: "Hyper text Markup Language" , correct: true},
            {text: "home tool Markup Language" , correct: false},
        ]
    },

    {
        question: "Choisissez l'élément HTML approprié pour le titre principal :",
        answers: [
            {text: "<h6>" , correct: false},
            {text: "<heading>" , correct: false},
            {text: "<h1>" , correct: true},
            {text: "<head>" , correct: false},
        ]
    },

    {
        question: "Quel est l'élément HTML correct pour insérer un saut de ligne ?",
        answers: [
            {text: "<Ib>" , correct: false},
            {text: "<break>" , correct: false},
            {text: "<br>" , correct: true},
        ]
    },

    {
        question: "Choisissez l'élément HTML approprié pour définir le texte important",
        answers: [
            {text: "<b>" , correct: false},
            {text: "<i>" , correct: false},
            {text: "<strong>" , correct: true},
            {text: "<important>" , correct: false},
        ]
    },
    
    {
        question: "Quel caractère est utilisé pour indiquer une balise de fin ?",
        answers: [
            {text: "/" , correct: true},
            {text: "<" , correct: false},
            {text: "." , correct: false},
            {text: "*" , correct: false},
        ]
    }
]


let questions_Java = [
    {
        question: "Quel type de données est utilisé pour créer une variable qui doit stocker du texte ?",
        answers: [
            {text: "myString " , correct: false},
            {text: "String" , correct: true},
            {text: "ToString" , correct: false},
            {text: "string" , correct: false}
        ]
    },

    {
        question: "Quelle méthode peut-on utiliser pour trouver la longueur d'une chaîne de caractères ?",
        answers: [
            {text: "getLength()" , correct: false},
            {text: "getSize()" , correct: true},
            {text: "length" , correct: false},
            {text: "len()" , correct: false},
        ]
    },

    {
        question: "Un membre de classe déclaré protégé en Java devient quel type de membre dans la sous-classe ?",
        answers: [
            {text: "membre du public" , correct: false},
            {text: "membre protégé" , correct: true},
            {text: "membre privé" , correct: false},
            {text: "membre statique" , correct: false},
        ]
    },

    {
        question: "Lequel de ces mots-clés doit être utilisé pour hériter d'une classe ?",
        answers: [
            {text: "super" , correct: false},
            {text: "extent" , correct: false},
            {text: "this" , correct: false},
            {text: "extends" , correct: true},
        ]
    },
    
    {
        question: "Quel concept de Java permet de convertir des objets du monde réel en termes de classes ?",
        answers: [
            {text: "Héritage" , correct: true},
            {text: "Polymorphisme" , correct: false},
            {text: "Abstraction" , correct: true},
            {text: "interface" , correct: false},
        ]
    }
]



/*---------------------- *\
 * - DOM Variables
\* --------------------- */


const take_Quiz_btn = document.getElementById("btn_take");
const list = document.getElementById("list");


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");





/*---------------------- *\
 * - Variables
\* --------------------- */

let currentQuestionIndex =0;
let score =0;



/*---------------------- *\
 * - Function
\* --------------------- */


/* ************* Take button *********************** */

function take() {
    take_Quiz_btn.classList.toggle('active')

    if(take_Quiz_btn.classList.contains('active')) {
        list.classList.add("show");
    }else {
        list.classList.remove("show")
    }
}

/*  **********************************************  */




function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion(questions_Html);
}


function showQuestion(questions){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML=questionNo +"."+ currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
           button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}


function resetState(){
    nextButton.style.display ="none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
          button.classList.add("corr;ect")
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}


startQuiz();

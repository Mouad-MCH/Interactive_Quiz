
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
//const list = document.getElementById("list");
const li = document.querySelectorAll(".sidebare .list li")


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");



/*---------------------- *\
 * - Variables
\* --------------------- */


let currentIndex = 0;
let score = 0;
let Q = [];

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
    
function initApp() {
    const list = document.querySelectorAll("#list");
    
    if (!list) {
        console.error("List element not found!");
        return; // Exit if element doesn't exist
    }
}
initApp();

// Array.from(list.children).forEach(el => {
//     el.addEventListener("click" , (e) => {

//         e.stopPropagation();
//         const link = el.querySelector("a");
//         const type = link.getAttribute("type");

//         console.log(type)
//         if (type === "html") {
//             localStorage.setItem("selectedQuiz", "html");
//             localStorage.setItem("quizQuestions", JSON.stringify(questions_Html));
//             window.location.href = "quize.html";
//         } else if (type === "java") {
//             localStorage.setItem("selectedQuiz", "java");
//             localStorage.setItem("quizQuestions", JSON.stringify(questions_Java));
//             window.location.href = "quize.html";
//         } 
//     })
// });


document.addEventListener("DOMContentLoaded", () => {
  const selectedQuiz = localStorage.getItem("selectedQuiz");
  const storedQuestions = localStorage.getItem("quizQuestions");
    Q = JSON.parse(storedQuestions);
    if (window.location.pathname.includes("quize.html") || window.location.pathname.endsWith("quize.html")) {
        startQuiz();
    }
})


function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}





function showQuestion() {
    resetState();
    let currentQuestion = Q[currentIndex];
    questionElement.textContent = (currentIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("btn");

        if (answer.correct) {
            btn.dataset.correct = "true";
        }

        btn.addEventListener("click", selectAnswer);
        answerButtons.appendChild(btn);
    });
}


function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}



function selectAnswer(e) {
    const selected = e.target;
    const correct = selected.dataset.correct === "true";

    if (correct) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}



nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < Q.length) {
        showQuestion(Q);
    }
    else {
        localStorage.setItem("Score", score);
        
        window.location.href = "home.html";
    }
    
});


// *********** Add Score to Home Page **************

let html_score = document.getElementById("score")

score = localStorage.getItem("Score");

html_score.textContent = `: ${score} / ${Q.length} `




// Function next Question


startQuiz();



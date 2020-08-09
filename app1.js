function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2> \n" + "<h2><b>Quizz is Over" + "</b>"+ "</h2>\n";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("What is the full form of OS??", ["Operating Software", "Operating System","Official System", "Office Source"], "Operating System"),
    new Question("The first UNIX operating system was written in??", ["Java", "Pascal", "Programming C", "Machine language"], "Programming C"),
    new Question("DOS stands for??", ["Disk Operating Signal", "Disk Operating System","Disk Orientation System", "Disk Orientaional Signal"], "Disk Operating System"),
    new Question("If the displayed time and date is wrong, how to reset it??", ["Write", "Calender", "Write File", "Control Panel"], "Control Panel"),
    new Question("The minimum number of frames to be allocated to a process is decided by the ____________??", ["The amount of memory", "Operating System", "All", "None"], "None"),
    new Question("You should save your computer from??", ["Viruses", "Time bombs", "Worms", "All"], "All"),
    new Question("Which of the following is an example of real time operating system??", ["Linux", "MS DOS", "Process Control", "Windows XP"], "Process Control"),
    new Question("Which of the following windows version supports 64 bit processor?", ["Windows 98", "Windows 2000", "Windows XP", "Windows 95"], "Windows XP"),
    new Question("Which operating system do you choose to implement a client server network??", ["MS DOS", "Windows 98", "Windows 2000", "Windows"], "Windows 2000"),
    new Question("Recently deleted files are stored in??", ["Recycle Bin", "Desktop", "Task Bar", "My Computer"], "Recycle Bin")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
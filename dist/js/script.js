
cards = function () {
    for (let i = 1; i <= 5; i++) {
        let newHtml;
        let html = '<div class="col-lg-2 col-sm-6 test"><div class="card" id="quiz-modal-%modalID%" data-quiz="%quizNumber%"><div class="card-top dark-overlay"><img src="/images/gk-card-%imgID%.jpg" alt="" class="img-fluid card-img-top" height="500px" width="700px"><div class="card-img-overlay text-center"><p class="text-white display-4 pt-3"></p></div></div><div class="card-body rounded pb-0"><div class="card-title mb-0"><h3>Quiz-%quizNo%</h3></div><div class="card-text"><p class="p-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,explicabo.</p></div></div></div>';
        newHtml = html.replace('%targetID%', i);
        newHtml = newHtml.replace('%modalID%', i);
        newHtml = newHtml.replace('%imgID%', i);
        newHtml = newHtml.replace('%quizNo%', i);
        newHtml = newHtml.replace('%quizNumber%', i);
        document.querySelector("#general-knowledge .row").insertAdjacentHTML("beforeend", newHtml);
    }
}

$(function () {
    cards();
    document.querySelectorAll('.card').forEach(function (element) {
        element.addEventListener('click', function (event) {
            // let quizNo = event.dataset.quiz;
            let quizNo = element.getAttribute('data-quiz');
            console.log(quizNo);
            modal(quizNo);
        });
    });
});


function modal(quizNo) {
    //for (let i = 1; i <= 5; i++) {
    let newHtml;
    let html = '';
    $('#quizModal').modal('show');
    quiz("./json/questions.json", quizNo);
    //}
}

function quiz(url, quizNo, questionNumber) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        console.log(this.status);
        if (this.status === 200) {
            let ques = JSON.parse(this.responseText);
            let questionNumber;
            let score = 0;
            let newScore = 0;
            display = (quesNo) => {
                document.querySelector('.question').innerHTML = `Q${questionNumber}&nbsp;&nbsp;&nbsp;${ques[quesNo].question}`;
                for (let i = 1; i <= 4; i++) {
                    document.querySelector(`.option-${i}`).innerHTML = `${i}. &nbsp;&nbsp;&nbsp;${ques[quesNo].options[i - 1]}`;
                }
                document.querySelector(".score").innerHTML = score;

                document.querySelector(".card-img-overlay p").innerHTML = newScore;
            }


            nextQuestion = (options) => {
                newScore = score;
                questionNumber++;

                if (questionNumber <= ques.length) {

                    for (let i = 1; i <= 4; i++) {
                        options.classList.remove("correct");
                        options.classList.remove("wrong");
                        console.log(questionNumber);
                    }
                    display(questionNumber - 1);

                } else {
                    zero(options);
                }

            }

            correct = () => {
                for (let i = 1; i <= 4; i++) {
                    let options = document.querySelector(`.option-${i}`);

                    options.addEventListener('click', () => {
                        if (i === ques[questionNumber - 1].correctAnswer) {
                            options.classList.add("correct");
                            score++;
                        } else {
                            options.classList.add("wrong");
                        }

                        if (questionNumber <= ques.length) {
                            setTimeout(function () {
                                nextQuestion(options);
                                console.log(questionNumber);
                            }, 1000);
                        } else {
                            options.disabled = true;
                        }
                    });
                }
            }

            zero = (options) => {

                questionNumber = 1;
                score = 0;

                for (let i = 1; i <= 4; i++) {
                    options.classList.remove("correct");
                    options.classList.remove("wrong");
                }
                setTimeout(() => {
                    $('#quiz-1').modal('hide');
                }, 1000);

                setTimeout(() => {
                    display(questionNumber - 1);
                }, 1200);
            }

            init = () => {
                questionNumber = 1
                correct();
                display(questionNumber - 1);
            }
            init();
        }
    }

    xhr.send();
}


//document.querySelector(`#quiz-modal-1`).addEventListener('click', quiz("./json/questions.json"));
//document.querySelector(`#quiz-modal-2`).addEventListener('click', quiz("./json/questions1.json"));


let data = [];
let card = [];
let quizNo = 0;
let quesNo = 0;
let score = [];
let category = '';
let scoreIndex;
let quesGroup;
let sliderIndicatorIndex = 0;

(async function datas(url) {
    if (data.length === 0) {
        let ques = await fetch(url);
        data = await ques.json();
        for (keys in data) {
            for (let i = 1; i <= data[keys].length; i++) {
                score.push(0);
            }
        }
    }

    if (card.length === 0) {
        let cardsPromise = await fetch(`./json/cards.json`);
        card = await cardsPromise.json();
    }

    function section(categories) {
        let newHtml;
        let html = '<section id="%sectionID%" class="sections"><div class="container-fluid text-dark"><div class="info-header row"><div class="col-md-9 p-0"><h4 class="acc" data-toggle="" data-target="%accordianTarget%">%quizCategory%</h4></div><div classs="col-md-3 py-0"><p class="p-0 mb-0 d-inline" id="%completeID%">0</p><p class="p-0 mb-0 d-inline">/%totalQuiz%</p></div></div><div class="row"><div class="col-1 left %left% p-0"><i class="fas fa-angle-left"></i></div><div class="items col-10" id="%accordianID%"></div><div class="col-1 %right% right p-0"><i class="fas fa-angle-right"></i></div></div></section>';

        newHtml = html.replace('%sectionID%', categories);
        newHtml = newHtml.replace('%accordianID%', `${categories}1`)
            .replace('%accordianTarget%', `#${categories}1`)
            .replace('%left%', `${categories}1left`)
            .replace('%right%', `${categories}1right`)
            .replace('%quizCategory%', card[categories].quizName)
            .replace('%totalQuiz%', data[categories].length)
            .replace('%completeID%', `${categories}Complete`);

        document.querySelector('footer').insertAdjacentHTML('beforebegin', newHtml);
    }

    function slider(categories) {
        let random = Math.floor(Math.random() * 1500);
        let newHtml;
        let indicatorNewHtml;
        let html = '<div class="carousel-item" style="background-image: url(\'https://source.unsplash.com/collection/8739028/1600x%imgID%\')"><div class="carousel-caption"><h2 class="display-4">%quizName%</h2><a href="#%category%" class="btn btn-warning btn-lg mb-3">Play Quiz</a></div></div>';

        newHtml = html.replace('%imgID%', random);
        newHtml = newHtml.replace('%quizName%', card[categories].quizName)
            .replace('%category%', categories);

        document.querySelector(`.carousel-inner`).insertAdjacentHTML('beforeend', newHtml);

        let indicatorHtml = '<li data-target="#carouselExampleIndicators" data-slide-to="%indicatorIndex%" class="indicator"></li>';
        indicatorNewHtml = indicatorHtml.replace('%indicatorIndex%', sliderIndicatorIndex);

        document.querySelector(`.carousel-indicators`).insertAdjacentHTML('beforeend', indicatorNewHtml);

        sliderIndicatorIndex++;
    }

    function scoresModalSection(categories) {
        let newHtml;
        let html = '<div class="title-%title%"><button class="btn btn-outline-warning btn-lg form-control mb-3" data-toggle="collapse" data-target="#%accordianTarget%-scores">%quizName% &nbsp;<i class="fa fa-caret-down"></i><i class="fa fa-caret-up d-none"></i></button></div><div class="row"><div class="col-12"><div class="table-responsive scoresArea collapse show" id="%accordianID%-scores"><table class="table"><tr><th>Quiz</th><th>Score</th></tr><tr id="%category%scoresSection"></tr></div></div></table></div>';

        newHtml = html.replace('%quizName%', card[categories].quizName);
        newHtml = newHtml.replace('%category%', categories)
            .replace('%accordianID%', categories)
            .replace('%accordianTarget%', categories)
            .replace('%title%', categories);

        document.querySelector(`.scoresBody`).insertAdjacentHTML('beforeend', newHtml);
    }

    function scoresArea(categories) {
        for (let i = 1; i <= data[categories].length; i++) {
            let newHtml;
            let cardNo;
            cardNo = card[categories].quizCards[i - 1].cardNo;
            let html = '<tr><td><div class="d-inline">Quiz-%quizNo%:</div></td><td><div class="d-inline scoresModalScore-%category%">0/10</div></div></td></tr>';

            newHtml = html.replace('%quizNo%', i);
            newHtml = newHtml.replace('%category%', cardNo);

            document.querySelector(`#${categories}scoresSection`).insertAdjacentHTML('beforebegin', newHtml);
        }
    }

    function cards(categories) {
        for (let i = 1; i <= data[categories].length; i++) {
            let newHtml;
            let random = Math.floor(Math.random() * 1000);
            let cardNo;
            cardNo = card[categories].quizCards[i - 1].cardNo;
            let html = '<div class="item"><div class="contain d-flex"><div class="card flex-fill" id="quiz-card-%modalID%"><img src="https://source.unsplash.com/collection/8738952/800x%imgID%" alt="" class="img-fluid card-img-top"><div class="card-img-overlay p-0"><div class="card-body rounded pb-0"><div class="card-title mb-0"><h3>Quiz-%quizNo%</h3></div><div class="card-text"><div class="sm-card-list"><li class="text-left"><p class="d-inline p-heading font-weight-bold">Topic:&nbsp;</p><p class="d-inline overflow text-capitalize text-right" id="topic-%topicID%" data-toggle="popover" data-placement="top" title="Tooltip"></p></li><li><p class="d-inline p-heading font-weight-bold">Score:&nbsp;</p><p class="d-inline text-right" id="score-%scoreID%">0/10</p></li><li><p class="d-inline p-heading font-weight-bold">Questions:&nbsp;</p><p class="d-inline text-right" id="questions-%questionID%"></p></li></div><div class="sm-card-button"><button class="btn btn-warning my-3 form-control card-button" data-quiz="%quizNumber%" data-category="%category%">Start</button></div></div></div></div></div></div></div>';

            newHtml = html.replace('%targetID%', i);
            newHtml = newHtml.replace('%modalID%', i)
                .replace('%imgID%', random)
                .replace('%quizNumber%', i)
                .replace('%quizNo%', i)
                .replace('%topicID%', cardNo)
                .replace('%scoreID%', cardNo)
                .replace('%questionID%', cardNo)
                .replace('%category%', categories);

            document.querySelector(`#${categories} .items`).insertAdjacentHTML("beforeend", newHtml);
            document.querySelector(`#topic-${cardNo}`).innerHTML = card[categories].quizCards[i - 1].cardTopic;
            document.querySelector(`#topic-${cardNo}`).setAttribute('title', `${card[categories].quizCards[i - 1].cardTopic}`);
            document.querySelector(`#questions-${cardNo}`).innerHTML = data[categories][i - 1].length;
        }

    }

    function dropdownIcon(section) {
        $(`.title-${section}`).click(function () {

            $(`.title-${section} .fa-caret-down`).toggleClass('d-none');
            $(`.title-${section} .fa-caret-up`).toggleClass('d-none');
        });
    }

    $(function () {
        for (let [key, value] of Object.entries(card)) {
            section(key);
            cards(key);
            slider(key);
            scoresModalSection(key);
            scoresArea(key);
            dropdownIcon(key);
        }

        // adding active class to caorusel images and carousel indicators
        document.querySelectorAll(`.carousel-item`)[0].classList.add('active');
        document.querySelectorAll(`.indicator`)[0].classList.add('active');

        document.querySelectorAll(`.items`).forEach(element => {
            $(`.${element.getAttribute('id')}right`).click(function () {
                event.preventDefault();
                $(`#${element.getAttribute('id')}`).animate({
                    scrollLeft: "+=900px"
                }, "slow");
            });

            $(`.${element.getAttribute('id')}left`).click(function () {
                event.preventDefault();
                $(`#${element.getAttribute('id')}`).animate({
                    scrollLeft: "-=900px"
                }, "slow");
            });
        })

        totalSc();
        correctAns();

        document.querySelectorAll(".card-button").forEach((element, index) => {
            element.addEventListener('click', () => {
                quizNo = 0;
                quesNo = 0;
                category = '';
                scoreIndex = index;
                quizNo = element.getAttribute('data-quiz');
                category = element.getAttribute('data-category');
                modal();
            });
        });

    });

    function modal() {
        $('#quizModal').modal('show');
        $('.modal-title').html(`Quiz-${quizNo}`);
        quiz();
    }

    function quiz() {
        score[scoreIndex] = 0;
        display(data[category][quizNo - 1][quesNo]);
    }

    function display(quiz) {
        document.querySelector('.question').innerHTML = `Q${quesNo + 1}&nbsp;&nbsp;&nbsp;${quiz.question}`;

        for (let i = 1; i <= 4; i++) {
            document.querySelector(`.option-${i}`).innerHTML = `${i}. &nbsp;&nbsp;&nbsp;${quiz.options[i - 1]}`;
        }

        scores();
    }

    function scores() {
        document.querySelector(`#score-${category}${quizNo}`).innerHTML = `${score[scoreIndex]
            }/${data[category][quizNo - 1].length}`;
        document.querySelector(`.scoresModalScore-${category}${quizNo}`).innerHTML = `${score[scoreIndex]
            }/${data[category][quizNo - 1].length}`;

        document.querySelector('.score').innerHTML = `${score[scoreIndex]}`;

        totalSc();
    }

    function totalSc() {
        let totalScore = score.reduce((acc, cur) => acc += cur);
        document.getElementById('total-score').innerHTML = `${totalScore}/${score.length * 10}`;
        document.getElementById('modalTotalScore').innerHTML = `${totalScore}/${score.length * 10}`;
    }

    function nextQuestion(options, rightAns) {
        scores();

        if (quesNo < data[category][quizNo - 1].length) {
            for (let i = 1; i <= 4; i++) {
                rightAns.classList.remove("correct");
                options.classList.remove("correct");
                options.classList.remove("wrong");
            }
            display(data[category][quizNo - 1][quesNo]);

        } else {
            zero(options);
        }

    }

    function correctAns() {
        for (let i = 1; i <= 4; i++) {
            let options = document.querySelector(`.option-${i}`);

            options.addEventListener('click', () => {
                let rightAns = document.querySelector(`.option-${data[category][quizNo - 1][quesNo].correctAnswer}`);
                if (i === data[category][quizNo - 1][quesNo].correctAnswer) {
                    options.classList.add("correct");
                    score[scoreIndex]++;
                } else {
                    rightAns.classList.add("correct");
                    options.classList.add("wrong");
                }

                if (quesNo < data[category][quizNo - 1].length) {
                    setTimeout(function () {
                        quesNo++;
                        nextQuestion(options, rightAns);
                    }, 1000);
                } else {
                    options.disabled = true;
                }
            });

        }

    }

    function zero(options) {
        for (let i = 1; i <= 4; i++) {
            options.classList.remove("correct");
            options.classList.remove("wrong");
        }
        setTimeout(() => {
            $('#quizModal').modal('hide');

            let html = '<i class="modalCompletedSign float-right fas fa-check-circle"></i>'
            document.querySelector(`.scoresModalScore-${category}${quizNo}`).insertAdjacentHTML('beforeend', html);

            let comp = document.querySelectorAll(`#${category}-scores .modalCompletedSign`).length;
            document.querySelector(`#${category}Complete`).innerHTML = comp;

        }, 100);
    }

})(`./json/questions.json`)


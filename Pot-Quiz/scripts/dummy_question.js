
const Diagnostics = require('Diagnostics');

export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function GetMathProblem(level) {
    if (level <= 1) {
        var randNumber = getRandomArbitrary(2, 11);
        return [randNumber, randNumber.toString()];
    }
    var equation = getRandomArbitrary(1, 4);


    var answerNumber;
    var answerString;

    // PLUS
    if (equation == 3 && level == 2)// Multiply 
    {
        var answer1 = GetMathProblem(level - 1);
        var answer2 = GetMathProblem(level - 1);

        answerNumber = Number(answer1[0]) * Number(answer2[0]);
        answerString = answer1[1] + " * " + answer2[1];

        return [answerNumber, answerString];
    }
    else if (equation == 1 && level == 2) /*if (equation == 1)*/ // Minus
    {
        var answer1 = GetMathProblem(level - 1);
        var answer2 = GetMathProblem(level - 1);

        answerNumber = Number(answer1[0]) - Number(answer2[0]);
        answerString = answer1[1] + " - " + answer2[1];

        return [answerNumber, answerString];
    }
    else {
        var answer1 = GetMathProblem(level - 1);
        var answer2 = GetMathProblem(level - 1);

        answerNumber = Number(answer1[0]) + Number(answer2[0]);
        answerString = answer1[1] + " + " + answer2[1];

        return [answerNumber, answerString];
    }
}

export function GetQuestionsAndAnswers() {
    var rand1 = Math.random();
    var rand2 = Math.random();
    var ans = rand1 + rand2;

    return ["What is " + rand1 + " + " + rand2 + "?", rand1, rand2, ans];
}

export function GetAnswers(number) {
    return ["answer " + number, true];
}
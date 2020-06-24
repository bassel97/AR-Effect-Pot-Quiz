
// Load in the required modules
const Patches = require('Patches');
const Scene = require('Scene');
const PatchesModule = require('Patches');
const Diagnostics = require('Diagnostics');
const Reactive = require('Reactive');

var scoreText;
Scene.root.findFirst('ScoreText').then(value => {
    scoreText = value;
    scoreText.text = "Score";
});

function SetScale(object, scale) {
    object.transform.scaleX = scale;
    object.transform.scaleY = scale;
    object.transform.scaleZ = scale;
}

var flowerStem;
Scene.root.findFirst('Flower stem').then(value => {
    flowerStem = value;
    SetScale(flowerStem, 50);
});

var flowerHead;
Scene.root.findFirst('Flower Head').then(value => {
    flowerHead = value;
    SetScale(flowerHead, 50);
});

import {
    GetQuestionsAndAnswers,
    GetMathProblem,
    getRandomArbitrary
} from "./dummy_question.js";

var answerZeroPulsed;
var answerOnePulsed;
var answerTwoPulsed;

var gameStaredPulsed;
var gameTimerEndedPulsed;
var gameStaredBoolean = false;

var correctAnswersNumber = 0;
var totalQuestionsNumber = 0;

var correctAnswerIndex;

function StartState() {
    PatchesModule.inputs.setString("Question", "Choose the correct answer\npress start");
    PatchesModule.inputs.setString("Answer0", "Answer 1");
    PatchesModule.inputs.setString("Answer1", "Answer 2");
    PatchesModule.inputs.setString("Answer2", "Answer 3");

    correctAnswersNumber = 0;
    totalQuestionsNumber = 0;
}

function SetQuestionsAndAnswers(hardness) {

    var questionTextString = GetMathProblem(hardness);

    PatchesModule.inputs.setString("Question", questionTextString[1].toString());

    correctAnswerIndex = getRandomArbitrary(0, 3);

    var randVal;

    if (correctAnswerIndex != 0)
        randVal = getRandomArbitrary(1, 30);
    else
        randVal = 0;

    PatchesModule.inputs.setString("Answer0", (questionTextString[0] + randVal).toString());

    if (correctAnswerIndex != 1)
        randVal = getRandomArbitrary(1, 30);
    else
        randVal = 0;

    PatchesModule.inputs.setString("Answer1", (questionTextString[0] + randVal).toString());

    if (correctAnswerIndex != 2)
        randVal = getRandomArbitrary(1, 30);
    else
        randVal = 0;
    PatchesModule.inputs.setString("Answer2", (questionTextString[0] + randVal).toString());

}

function EndGame() {
    PatchesModule.inputs.setPulse("EndGamePulse", Reactive.once());

    StartState();
}

function AnsweredFunction(number) {

    if (!gameStaredBoolean) {
        return;
    }

    if (number == correctAnswerIndex) {
        //Diagnostics.log("Correct Answer");
        correctAnswersNumber += 1;

        SetScale(flowerStem, 50 + correctAnswersNumber * 10);
        SetScale(flowerHead, 50 + correctAnswersNumber * 10);

        if (correctAnswersNumber >= 5) {
            EndGame();
            return;
        }
    }
    else {
        //Diagnostics.log("False Answer");
    }

    SetQuestionsAndAnswers(3);
    totalQuestionsNumber += 1;
    scoreText.text = correctAnswersNumber.toString() + "/" + totalQuestionsNumber.toString();

};

PatchesModule.outputs.getPulse("AnswerZero").then(event => {
    answerZeroPulsed = event.subscribe(function () {
        AnsweredFunction(0);
    });
});

PatchesModule.outputs.getPulse("AnswerOne").then(event => {
    answerOnePulsed = event.subscribe(function () {
        AnsweredFunction(1);
    });
});


PatchesModule.outputs.getPulse("AnswerTwo").then(event => {
    answerTwoPulsed = event.subscribe(function () {
        AnsweredFunction(2);
    });
});

PatchesModule.outputs.getPulse("GameStarted").then(event => {
    gameStaredPulsed = event.subscribe(function () {
        gameStaredBoolean = true;

        SetQuestionsAndAnswers(3);

        scoreText.text = "Score";

        SetScale(flowerStem, 50);
        SetScale(flowerStem, 50);


        //Diagnostics.log("GameStarted");
    });
});

PatchesModule.outputs.getPulse("GameTimerEnded").then(event => {
    gameTimerEndedPulsed = event.subscribe(function () {
        gameStaredBoolean = false;

        EndGame();

        //Diagnostics.log("GameTimerEnded");
    });
});

PatchesModule.outputs.getScalar("GameTimer").then(event => {
    PatchesModule.inputs.setString("Timer", event.add(-10).abs().toString().concat("s"));
});

StartState();
//PatchesModule.inputs.setString("Score", correctAnswersNumber.toString() + "/" + totalQuestionsNumber.toString());
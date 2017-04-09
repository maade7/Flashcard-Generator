/**
 * Created by maade on 4/8/17.
 */
var MC = require("./flashcard");
var fs = require("fs");
var inquirer = require("inquirer");

var action = process.argv[2];
var front = process.argv[3];
var back = process.argv[4];


askUser();

function askUser() {


    inquirer.prompt([

        {
            type: "list",
            message: "Would you like to play a game or make a new card?",
            choices: [
                "play", "make-basic-card", "make-cloze-card"
            ],
            name: "action"
        }
    ]).then(function (user) {
        action = user.action;

        callSwitch();
        // console.log(JSON.stringify(user, null, 2));

    });
}

function callSwitch() {
    switch (action) {
        case "play":
            play();
            break;

        case "make-basic-card":
            makeBasic();
            break;

        case "make-cloze-card":
            makeCloze();
            break;

    }

}

function makeBasic() {

    inquirer.prompt([

        {
            type: "input",
            message: "Enter a question for the front of the card:",
            name: "front"
        },
        {
            type: "input",
            message: "Enter a answer for the back of the card:",
            name: "back"
        }


    ]).then(function (user) {
        front = user.front;
        back = user.back;

        // log();

        var newCard = MC.cards.BasicCard(front, back);
        console.log(JSON.stringify(newCard, null, 2));
        saveCard(newCard);
    });
}

function makeCloze() {

    inquirer.prompt([

        {
            type: "input",
            message: "Enter text for the front of the card including the Cloze:",
            name: "front"
        },
        {
            type: "input",
            message: "Enter the Cloze for the back of the card:",
            name: "back"
        }


    ]).then(function (user) {
        front = user.front;
        back = user.back;

        // log();

        var newCard = MC.cards.ClozeCard(front, back);
        console.log(JSON.stringify(newCard, null, 2));
        saveCard(newCard);
    });
}

function saveCard(newCard) {


    inquirer.prompt([

        {
            type: "confirm",
            message: "Would you like to save this card?",
            name: "confirm",
            default: true

        }
    ]).then(function (user) {
        if (user.confirm) {

            log(newCard);

        } else {
            console.log('This card was NOT saved.');
        }
    });
}


function log(newCard) {

    var obj = require("./log.json");
    obj.push(newCard);
    fs.writeFile("./log.json", JSON.stringify(obj), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('This card has been saved.');
        }
    });
}


function play() {
    fs.readFile("./log.json", "utf8", function read(err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            var cards = JSON.parse(data);
var i = 0;
            showcards();
          function showcards() {
              console.log(cards[i].front);
              // console.log(cards);
              inquirer.prompt([

                  {
                      type: "confirm",
                      message: "Ready for the answer?",
                      name: "confirm",
                      default: true

                  }
              ]).then(function (user) {
                  if (user.confirm) {

                      console.log(cards[i].back);
                      if (i !== cards.length-1) {

                          inquirer.prompt([

                              {
                                  type: "confirm",
                                  message: "Ready for the next card?",
                                  name: "confirm",
                                  default: true

                              }
                          ]).then(function (user) {
                              if (user.confirm) {

                                  i += 1;
                                  showcards();
                              } else {


                              }
                          });

                      } else {
                          console.log('That was the last card.');
                      }
                  }
              });
          }

        }
    });
}


// var firstPresident = MC.cards.BasicCard("Who was the first president of the United States?", "George Washington");
//
// var firstPresidentCloze = new MC.cards.ClozeCard("George Washington was the first president of the United States.", "George Washington");
//
// console.log(firstPresident.front);
//
// console.log(firstPresident.back);
//
// console.log(firstPresidentCloze.cloze);
//
// console.log(firstPresidentCloze.partial);
//
// console.log(firstPresidentCloze.text);
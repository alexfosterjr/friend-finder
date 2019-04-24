let path = require("path");
let friends = require("../app/data/friends")

module.exports = function (app) {
    // to show all friends and their answers is someone goes to the url with /api/friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        let userAnswers = req.body.scores;

        for (i = 0; i < userAnswers.length; i++) {
            userAnswers[i] = parseInt(userAnswers[i]);
        };
        let bestMatchScore = 100
        let bestMatch = 0

        for (i = 0; i < friends.length; i++) {
            let difference = compare(userAnswers, friends[i].scores);

            if (difference < bestMatchScore) {
                bestMatchScore = difference;
                bestMatch = i
            }
        }



        function compare(array1, array2) {

            let diff = 0

            for (j = 0; j < array1.length; j++) {
                diff += Math.abs(array1[j] - array2[j])
            }
            return diff;
        }
        console.log(friends)
        res.send(friends[bestMatch]);
    });

};
const Sequelize = require("sequelize")

const db = new Sequelize('sqlite://persistence.db.sqlite');

const RoundModel = db.define("round",
    {
        p1Throw: { type: Sequelize.STRING }
    }
)

RoundModel.sync({force: true}).then(function () {
    return RoundModel.create({
        p1Throw: "rock"
    })
}).then(function (round) {
    console.log(round)
})
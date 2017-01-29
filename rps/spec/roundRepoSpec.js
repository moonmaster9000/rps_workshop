const generateUUID = require("uuid/v4")

const FakeRoundRepo = function () {
    const rounds = []

    this.save = function (round) {
        rounds.push(round)

        if (round.getId() == null){
            round.setId(generateUUID())
        }

        return Promise.resolve(round)
    }

    this.getAll = function () {
        return Promise.resolve(rounds)
    }
}

const Round = function ({id}={}) {
    this.getId = function () {
        return id
    }

    this.setId = function (newId) {
        id = newId
    }
}

describe("round repo", function () {
    let repo

    beforeEach(function () {
        repo = new FakeRoundRepo()
    })

    it("saves rounds for later retrieval", function (done) {
        repo.save(new Round())
            .then(() =>
                repo.getAll())
            .then((rounds) => {
                expect(rounds.length).toEqual(1)
                done()
            })
    })

    it("gives rounds ids on save", function (done) {
        let round1 = new Round()

        repo.save(round1).then((savedRound1) => {
            expect(savedRound1.getId()).toBeDefined()
            done()
        })
    })

    it("honors provided ids on save", function (done) {
        let round = new Round()
        var roundId = "userprovidedid";
        round.setId(roundId)

        repo.save(round)
            .then((savedRound) => {
                expect(savedRound.getId()).toEqual(roundId)
                done()
        })
    })

    it("gives rounds a unique id", function (done) {
        let round1 = new Round()
        let round2 = new Round()

        repo.save(round1)
            .then(() =>
                repo.save(round2))
            .then(() =>
                repo.getAll())
            .then((rounds) => {
                let ids = rounds.map(r => r.getId())

                expect(ids.length).toEqual(2)
                expect(ids[0]).not.toEqual(ids[1])

                done()
            })

    })
})
const generateUUID = require("uuid/v4")

const FakeRoundRepo = function(){
    const rounds = []

    this.save = function(round){
        rounds.push(round)
        round.setId(generateUUID())

        return promise(thenHandler => thenHandler())
    }

    this.getAll = function() {
        return promise(thenHandler => thenHandler(rounds))
    }

    function promise(thenHandler) {
        return {
            then: thenHandler
        }
    }
}

const Round = function({id}={}){
    this.getId = function(){
        return id
    }

    this.setId = function(newId){
        id = newId
    }
}

describe("round repo", function () {
    it("saves rounds for later retrieval", function (done) {
        const repo = new FakeRoundRepo()

        repo.save(new Round())

            .then(function() {
                return repo.getAll()
            })

            .then(function (rounds) {
                expect(rounds.length).toEqual(1)
                done()
            })
    })

    it("gives rounds a unique id", function(){
        const repo = new FakeRoundRepo()

        let round1 = new Round()
        let round2 = new Round()

        repo.save(round1)
            .then(()=>
                repo.save(round2))
            .then(()=>
                repo.getAll())
            .then((rounds) => {
                let ids = rounds.map(r => r.getId())

                expect(ids.length).toEqual(2)
                expect(ids[0]).not.toEqual(ids[1])
            })

    })
})
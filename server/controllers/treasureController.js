module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        const gotDragonTreasure = await db.get_dragon_treasure(1)
        return res.status(200).send(gotDragonTreasure[0])
    },

    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const gotUserTreasure = await db.get_user_treasure(id)
        res.status(200).send(gotUserTreasure)
    },

    addUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const {treasureURL} = req.body
        const {id} = req.session.user
        const addUserTreasure = await db.add_user_treasure(treasureURL, id)
        res.status(200).send(addUserTreasure)
    },

    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')
        const allTreasure = await db.get_all_treasure()
        res.status(200).send(allTreasure)
    }
}






pixMons = (req, res, next) => {
    const dbInstance = req.app.get("db");
    
        dbInstance.query('select * from monsters').then(response => {
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
}
pixItems= (req, res, next) => {
    const dbInstance = req.app.get("db");
    
    dbInstance.query('select * from equipment').then(response => {
        res.status(200).send(response)
    })
    .catch(err => console.log(err))
}

module.exports = {
    pixMons,
    pixItems
}


pixMons = (req, res, next) => {
    const dbInstance = req.app.get("db");
    
        dbInstance.query('select * from monsters').then(response => {
            res.status(200).send(response)
        })
        .catch(err => console.log(err))
}
pixWeapons= (req, res, next) => {
    const dbInstance = req.app.get("db");
    
    dbInstance.query('select * from equipment').then(response => {
        res.status(200).send(response)
    })
    .catch(err => console.log(err))
}

submitArt = (req, res, next) => {
    console.log('req.body', req.body)

    req.app.get('db').pixel_art.insert({table_name: req.body.table, item_name: req.body.name, img_string: req.body.image}, (err, response) => {
        // shouldnt need to receive anything here
    })
}

submitHeroArt = (req, res, next) => {
    // console.log('req.body', req.body)

    req.app.get('db').submitHeroArt([req.body.image, req.body.heroID]).then(response => {
        res.status(200).send(response)
    })
    .catch(err => console.log(err))
}

module.exports = {
    pixMons,
    pixWeapons,
    submitArt,
    submitHeroArt
}
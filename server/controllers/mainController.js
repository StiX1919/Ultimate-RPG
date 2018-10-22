

    getClasses = (req, res) => {
      const dbInstance = req.app.get("db");
  
      dbInstance.getClasses().then(response => {
          return res.status(200).json(response)
      }).catch(console.log)
    },
    getRaces = (req, res) => {
        const dbInstance = req.app.get("db");
    
        dbInstance.getRaces().then(response => {
            return res.status(200).json(response)
        }).catch(console.log)
    },

    createNewHero = (req, res) => {
        
        const {name, heroClass, stats, luck} = req.body
        const dbInstance = req.app.get('db');

        dbInstance.createNewHero([
            name,
            heroClass,
            10,
            req.session.passport.user.user_id
            //change 1 to userId
        ])
        .then(response => {
            let HP = (stats[0].value + stats[2].value)*2
            let SP = (stats[1].value + stats[3].value)
            let MP = stats[3].value + luck
            dbInstance.createHeroStats([
                response[0].hero_id,
                stats[0].value, 
                stats[1].value, 
                stats[2].value, 
                stats[3].value,
                HP,
                SP,
                MP,
                luck,
                1,
                0,
                0
            ]).then(statResponse => {
                res.sendStatus(200)
            }).catch(statErr => {
                console.log('stats error', statErr)
            })
        }).catch(heroErr => {
            console.log('hero Error', heroErr)
        })

        // dbInstance.createNewHero([req.body.name, 
        //                             req.body.class, 
        //                             stats['Strength'].value, 
        //                             stats['Speed'].value, 
        //                             stats['Endurance'].value, 
        //                             stats['Intelligence'].value,
        //                             req.body.userId])
        // .then(response => {
        //     res.status(200).json(response)
        // }).catch(console.log)

    },

    getHeroes = (req, res) => {
        req.app.get('db').getHeroes(req.session.passport.user.user_id).then(response => {
            res.status(200).json(response)
        }).catch(err => console.log(err))
    },

    demoHero = (req, res) => {
        req.app.get('db').getDemo()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => console.log(err))
    },

    getMap = (req, res) => {
        req.app.get('db').getMap([req.params.X, req.params.Y])
        .then( response => {
            res.status(200).json(response)
        })
    },
    newPlace = (req, res) => {
        const {
            area_name, area_type, area_x, area_y, discovered_by, x_location, y_location
        } = req.body
        req.app.get('db').newPlace([area_name, area_type, area_x, area_y, discovered_by, x_location, y_location])
    }

module.exports = {
    getClasses,
    getRaces,
    createNewHero,
    getHeroes,
    demoHero,
    getMap,
    newPlace
}
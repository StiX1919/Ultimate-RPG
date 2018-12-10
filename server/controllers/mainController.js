const defaultPic = 'data:image/png;base64,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'


let monsters = []

let mappedMonsters = [],

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
            req.session.passport.user.user_id,
            defaultPic
            //change 1 to userId
        ])
        .then(response => {
            let HP = (stats[0].value + stats[2].value)*2
            let SP = (stats[1].value + stats[2].value)
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
            .then(response => {
                res.status(200).send(response)
            })
    },

    getMonsters = (req, res) => {
        let {X, Y} = req.params
        if(X === 0){
            X = 1
        }
        if(Y === 0){
            Y = 1
        }
        let big = Math.max(X, Y)
        let small = Math.min(X, Y)
        let mapMons = []
        console.log('before if')
        if(!monsters[0]){
            req.app.get('db').getAllMonsters().then( response => {
                monsters = response.slice()
                for(let i = 0; i < 10; i++){
                    let newMon = {...monsters[Math.floor(Math.random() * monsters.length)]}
                    if(newMon.str === 0){
                        newMon.str = 1
                    }
                    if(newMon.spd === 0){
                        newMon.spd = 1
                    }
                    if(newMon.def === 0){
                        newMon.def = 1
                    }

                    let str = (newMon.str + (newMon.str * big)) * small,
                        spd = (newMon.spd + (newMon.spd * big)) * small,
                        def = (newMon.def + (newMon.def * big)) * small,
                        level = (1 + big) * small
    
                    let hp = (str + def) * 2
                    let finalMon = Object.assign(newMon, { level, str, spd, def, hp})
    
                    mapMons.push(finalMon)
                }
                mappedMonsters = mapMons
                res.status(200).send(mappedMonsters)
            })
        }
        else {
            for(let i = 0; i < 10; i++){
                let newMon = {...monsters[Math.floor(Math.random() * monsters.length)]}
                if(newMon.str === 0){
                    newMon.str = 1
                }
                if(newMon.spd === 0){
                    newMon.spd = 1
                }
                if(newMon.def === 0){
                    newMon.def = 1
                }

                let str = (newMon.str + (newMon.str * big)) * small,
                    spd = (newMon.spd + (newMon.spd * big)) * small,
                    def = (newMon.def + (newMon.def * big)) * small,
                    level = (1 + big) * small

                let hp = (str + def) * 2
                let finalMon = Object.assign(newMon, { level, str, spd, def, hp})

                mapMons.push(finalMon)
            }
            mappedMonsters = mapMons
            res.status(200).send(mappedMonsters)
        }
    },

    getMonster = (req, res) => {
        let {X, Y} = req.params
        if(X === 0){
            X = 1
        }
        if(Y === 0){
            Y = 1
        }
        
        let big = Math.max(X, Y)
        let small = Math.min(X, Y)


        let grabMon = monsters[Math.floor(Math.random() * monsters.length)]
        console.log(grabMon)
        let newMon = Object.assign({}, grabMon)
        if(newMon.str === 0){
            newMon.str = 1
        }
        if(newMon.spd === 0){
            newMon.spd = 1
        }
        if(newMon.def === 0){
            newMon.def = 1
        }
        let str = (newMon.str + (newMon.str * big)) * small,
            spd = (newMon.spd + (newMon.spd * big)) * small,
            def = (newMon.def + (newMon.def * big)) * small,
            level = (1 + big) * small

        let hp = (str + def) * 2
        let finalMon = Object.assign(newMon, {level, str, spd, def, hp})

        res.status(200).send(finalMon)
    },


    getUserCharm = (req, res) => {
        req.app.get('db').query(`select * from unique_charm where user_id = ${req.user.user_id}`).then( response => {
            res.status(200).send(response)
        })
    }


module.exports = {
    getClasses,
    getRaces,
    createNewHero,
    getHeroes,
    demoHero,
    getMap,
    newPlace,
    getMonsters,
    getMonster,
    getUserCharm
}
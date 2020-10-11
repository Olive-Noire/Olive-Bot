const fs = require ("fs");

exports.FindUser = function(id) { 
    
    return require(__dirname + "/../../Donnees/Utilisateurs/" + id + ".json"); 

}

exports.UdpateUser = function(name,id) {

    User = exports.FindUser(id);

    let UserUpdapted = {

        name: name,
        id: User.id,
        xp: User.xp,
        level: User.level,
        warn: User.warn,
        mute: User.mute,
        save: User.save

    }

    fs.writeFileSync(__dirname + "/../../Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(UserUpdapted), err => {

        console.log(err);

    });

}

exports.DeleteUser = function (id) {

    if (!FindUser(id).save) {

        fs.unlinkSync(__dirname + "/../../Donnees/Utilisateurs/" + id + ".json", err => {

            console.log(err);

        });

    }

}

exports.AddUser = function(name,id,xp,level,warn,mute,save) {

    let user = { 

        name: name, 
        id: id,
        xp: xp,
        level: level,
        warn: warn,
        mute: mute,
        save: save,

    }; 

    fs.writeFileSync(__dirname + "/../../Donnees/Utilisateurs/" + id + ".json",  JSON.stringify(user), err => { 

        if (err) throw err;  
           
        console.log("Nouveau Utilisateur enregistrer !");

    });

}
import db from '../models/index';

let handleUserLogin = (email, password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist){
                // user already exist
                // compare passw
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    if(password==user.password){
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        // delete user
                        userData.user = user;
                        delete userData.user.password
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                }else {
                    userData.errCode = 2;
                    userData.errMessage = `User not exist`;
                }
            } else {
                // return err
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
                
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }

    })
}


let checkUserEmail = (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail}
            })

            if (user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}
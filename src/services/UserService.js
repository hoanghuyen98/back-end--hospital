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


let getAllUsers = (userId) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'all'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }, 
                })
            } 
            if (userId && userId !=='all') {
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email'
                })
            }else {
                await db.User.create({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId
                })
    
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id}, 
            })
            if(!user) {
                resolve({
                    errCode: 2, 
                    errMessage: 'The user not exist'
                })
            }
            await db.User.destroy({
                where: {id}
            });
            resolve({
                errCode: 0,
                message: "User is delete"
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address
                await user.save()
            
                resolve({
                    errCode: 0,
                    message: "Update the user success"
                })
            }else {
                resolve({
                    errCode: 1,
                    message: "User not found"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}
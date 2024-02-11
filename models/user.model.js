const pool = require("../db/connection");
const bcrypt = require("bcrypt");

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
}

function comparePasswords(plaintextPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function createUser(username, password) {
    return new Promise((resolve, reject) => {
        // Check if the username already exists
        pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    // Username already exists, reject with an error
                    reject(new Error('Username already exists'));
                } else {
                    // Username does not exist, hash the password and insert the user
                    hashPassword(password)
                        .then(hashedPassword => {
                            pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(results.insertId);
                                }
                            });
                        })
                        .catch(error => reject(error));
                }
            }
        });
    });
}



function loginUser(username, password) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length === 0) {
                    resolve(null);
                } else {
                    const hashedPassword = results[0].password;
                    comparePasswords(password, hashedPassword)
                        .then(match => {
                            if (match) {
                                resolve(results);
                            } else {
                                resolve(null);
                            }
                        })
                        .catch(err => reject(err));
                }
            }
        });
    });
}



module.exports = {
    createUser,
    loginUser
};
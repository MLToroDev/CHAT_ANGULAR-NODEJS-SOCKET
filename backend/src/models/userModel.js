const { hashPassword } = require("../utils/auth")

module.exports = {
    get: (con, callback) => {
        con.query('SELECT * FROM users', callback)
    },

    getById: (con, id,callback) => {
        con.query(`SELECT * FROM users WHERE id = ${id} `, callback)
    },
    getByEmail: (con, email,callback) => {
        con.query(`SELECT * FROM users WHERE email = '${email}' `, callback)
    },
    create: (con, data,callback) => {
        con.query(`INSERT INTO users SET 
        firstName = '${data.firstName}',
        lastName = '${data.lastName}',
        email = '${data.email.toLowerCase()}',
        password = '${hashPassword(data.password)}',
        roleId = '${typeof data.roleId !== 'undefined' ? data.roleId : 2}',
        img = '${data.img}',
        active =  '${typeof data.active !== 'undefined' ? data.active : 1}}'
         `, callback)
    },
}
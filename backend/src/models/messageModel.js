

module.exports = {
    get: (con, callback) => {
        con.query(`SELECT messageType,fileUrl,content, messages.id as id, userid, date, firstName,lastName FROM messages INNER JOIN users ON messages.userId = users.id`, callback)
    },

    getById: (con, id,callback) => {
        con.query(`SELECT * FROM messages WHERE id = ${id} `, callback)
    },
    destroy: (con, id,callback) => {
        con.query(`DELETE FROM messages WHERE id = ${id} `, callback)
    },
    create: (con, data,callback) => {
       
        con.query(`INSERT INTO messages SET 
        content = '${data.content}',
        userId = '${data.userid}',
        messageType = '${data.messageType}',
        fileUrl = ''
         `, callback)
    },
}
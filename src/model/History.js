const database = require('../config/Databases')
const History = {}

History.getAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM histories ORDER BY id DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

History.add = (invoices, cashier, date, orders, amount) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO histories (invoices, cashier, date, orders, amount, created_at, updated_at) VALUES ('${invoices}', '${cashier}', '${date}', '${orders}', ${amount}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

History.edit = (id, invoices, cashier, date, orders, amount) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE histories SET invoices='${invoices}', cashier='${cashier}', date='${date}', orders='${orders}', amount=${amount}, updated_at=CURRENT_TIMESTAMP WHERE id=${id} RETURNING *`)
            .then((res) => {
                if (res.rows.length === 0) {
                    reject('Data tidak ditemukan')
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

History.delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM histories WHERE id=${id} RETURNING *`)
            .then((res) => {
                if (res.rows.length === 0) {
                    reject('Data tidak ditemukan')
                } else {
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = History
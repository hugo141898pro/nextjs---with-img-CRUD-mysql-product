import {createPool} from 'mysql2/promise'

export const pool = createPool({
        host: 'localhost',
        user: 'root',
        password: 'hugoarcoszuñiga141898',
        port: 3306,
        database: 'nextmysqlcrud'
})
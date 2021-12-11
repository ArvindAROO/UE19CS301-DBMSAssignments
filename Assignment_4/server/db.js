const Pool= require('pg').Pool;

const pool=new Pool({
    user: 'postgres',
    password: 'pratheek',
    host: 'localhost',
    database: 'tbs_assignment',
    port: 5432
});

module.exports=pool;
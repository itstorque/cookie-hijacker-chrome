To set up make sure you

`npm install`

then go to localhost:3000

To add strings to database, go to localhost:3000/report-a-bug/{string-to-add-to-db}

To see the strings in the database, go to localhost:3000/SUPERSECRETDATABASEDEALIO

Follow this tutorial to set up the postgres database: https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/


To start/stop: `brew services [start/stop] postgresql`

```
CREATE TABLE bugs (
  ID SERIAL PRIMARY KEY,
  bug VARCHAR(60)
);
```

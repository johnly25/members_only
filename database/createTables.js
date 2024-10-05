const createTables =
`
DROP TABLE IF EXISTS users, messages; 

CREATE TABLE users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR not null,
    username VARCHAR not null,
    password VARCHAR not null,
    membership BOOLEAN not null DEFAULT false
);

CREATE TABLE messages( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    timestamp TIMESTAMP  not null DEFAULT now(),
    title VARCHAR,
    text TEXT not null,
    userid INTEGER not null
);

ALTER TABLE messages 
    ADD CONSTRAINT fk_messages_users FOREIGN KEY (userid) REFERENCES users (id)
`

module.exports = {createTables};
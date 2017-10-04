### Schema
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name TEXT NOT NULL,
	devoured BOOLEAN NOT NULL DEFAULT FALSE,
	date TIMESTAMP,
	PRIMARY KEY (id)
);

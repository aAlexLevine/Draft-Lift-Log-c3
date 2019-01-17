DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  pass varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE plans (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  planName varchar(255) NOT NULL,
  -- exercise varchar(255) NOT NULL,
  -- setCount int NOT NULL,
  -- repTotal int NOT NULL,
  -- plan_group varchar(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE (planName)
 -- remove exercise, repcount?, plangroups
);

CREATE TABLE groups (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  plan_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE exercises (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  numOfSets int NOT NULL,
  numOfReps int NOT NULL,
  plan_id int NOT NULL,
  group_id int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE sets_rest (
  id int NOT NULL AUTO_INCREMENT,
  logs_id int NOT NULL,
  exercise varchar(255) NOT NULL,
  setNum int NOT NULL,
  reps int NOT NULL,
  rest int NOT NULL,
  date date NOT NULL,
  PRIMARY KEY (ID) 
);

CREATE TABLE logs ( 
  id int NOT NULL AUTO_INCREMENT,
  date date NOT NULL,
  user_id int NOT NULL,
  plan_id int NOT NULL,
  plan_group varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 INSERT INTO logs (date, user_id, plan_id, plan_group)
 VALUES (now(), 1, 1, 'B');

 INSERT INTO sets_rest(logs_id, exercise, setNum, reps, rest, date)
 VALUES (1, 'OverheadPress', 1, 5, 4000, now());

 INSERT INTO plans (user_id, planName)
 VALUES (1, 'woopidy');

 INSERT INTO plans (user_id, planName)
 VALUES (1, 'boopidy');

INSERT INTO groups (title, plan_id)
VALUES ('A', 1);

INSERT INTO groups (title, plan_id)
VALUES ('B', 1);

INSERT INTO groups (title, plan_id)
VALUES ('C', 1);

INSERT INTO groups (title, plan_id)
VALUES ('on', 2);

INSERT INTO groups (title, plan_id)
VALUES ('off', 2);
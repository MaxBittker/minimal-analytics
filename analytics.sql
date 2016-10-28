DROP DATABASE IF EXISTS analytics;
CREATE DATABASE analytics;

\c analytics;

CREATE TABLE pages (
  ID SERIAL PRIMARY KEY,
  time timestamp DEFAULT current_timestamp,
  gsid VARCHAR,
  anonId VARCHAR,
  ip VARCHAR,
  url VARCHAR,
  path VARCHAR,
  referrer VARCHAR,
  title VARCHAR
);

CREATE TABLE identifies(
  ID SERIAL PRIMARY KEY,
  time timestamp DEFAULT current_timestamp,
  gsid VARCHAR,
  anonId VARCHAR
);

CREATE TABLE groups(
  ID SERIAL PRIMARY KEY,
  time timestamp DEFAULT current_timestamp,
  gsid VARCHAR,
  anonId VARCHAR,
  orgId VARCHAR
);

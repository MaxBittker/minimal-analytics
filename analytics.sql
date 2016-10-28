DROP DATABASE IF EXISTS analytics;
CREATE DATABASE analytics;

\c analytics;

CREATE TABLE pings (
  ID SERIAL PRIMARY KEY,
  time timestamp DEFAULT current_timestamp,
  gsid VARCHAR,
  anonId VARCHAR,
  url VARCHAR,
  path VARCHAR,
  referrer VARCHAR,
  title VARCHAR
);

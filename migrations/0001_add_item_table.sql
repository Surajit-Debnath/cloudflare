-- Migration number: 0001 	 2026-11-20T10:11:51.908Z
DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
    id integer primary key autoincrement,
    title text not null,
    release_date text not null,
    rating integer not null
);
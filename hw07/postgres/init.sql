CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ctf_flag VARCHAR(255) NOT NULL
);

INSERT INTO students (name, ctf_flag) VALUES ('Alice', 'flag{ctf_flag}');
INSERT INTO students (name, ctf_flag) VALUES ('Bob', 'flag{another_ctf_flag}');

-- Super basic free offline courses

CREATE TABLE courses (
    id INT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    descr TEXT,
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    capacity INT,
    status VARCHAR(20)
);

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(64) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    enrollments JSON
);

CREATE TABLE instructors (
    id INT PRIMARY KEY,
    course_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status VARCHAR(20),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    enrollment_date DATE,
    enrollment_status VARCHAR(20),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);


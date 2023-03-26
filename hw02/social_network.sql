-- Super basic social network

CREATE TABLE users (
    id INT PRIMARY KEY,
    profile_id INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    REFERENCES (profile_id) REFERENCES profiles(id)
);

CREATE TABLE profiles (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    birthday_date TIMESTAMP,
    surname VARCHAR(255),
    first_name VARCHAR(255),
    patronymic VARCHAR(255),
    bio VARCHAR(255),
    avatar_id INT,

    images_gallery JSON,
    videos_gallery JSON,
    posts JSON,
    groups JSON,
    audios JSON,
    chats JSON,

    full_address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    interests VARCHAR(255),
    education VARCHAR(255),
    work VARCHAR(255),
    relationship_status VARCHAR(255),
    smoking_status VARCHAR(255),
    alcohol_status VARCHAR(255),
    religion VARCHAR(255),
    political_views VARCHAR(255),
    languages VARCHAR(255),
    last_seen TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (avatar_id) REFERENCES photos(id)
);

CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    post_text TEXT,
    images JSON,
    videos JSON,
    audios JSON,
    files JSON,
    likes INT,
    comments JSON,
    views INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE groups (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    group_name VARCHAR(255),
    avatar_id INT,
    descr TEXT,
    admins JSON,
    members JSON,
    posts JSON,
    link VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (avatar_id) REFERENCES photos(id)
);

CREATE TABLE chats (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    chat_name VARCHAR(255),
    avatar_id INT,
    descr TEXT,
    admins JSON,
    members JSON,
    posts JSON,
    photos JSON,
    videos JSON,
    audios JSON,
    files JSON,
    messages JSON,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (avatar_id) REFERENCES photos(id)
);

CREATE TABLE messages (
    id INT PRIMARY KEY,
    chat_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text_msg TEXT,
    images JSON,
    videos JSON,
    audios JSON,
    files JSON,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE photos (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE videos (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE audios (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE files (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comment_text TEXT,
    likes INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


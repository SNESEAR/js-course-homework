-- Super basic web shop

CREATE TABLE users (
    id INT PRIMARY KEY,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    password_hash VARCHAR(64) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    birthday_date TIMESTAMP,
    birthday_reminder BOOLEAN NOT NULL DEFAULT TRUE
    delivery_address VARCHAR(255),
    delivery_method VARCHAR(20) NOT NULL DEFAULT 'courier',
    payment_method VARCHAR(20) NOT NULL DEFAULT 'card'
);


CREATE TABLE goods (
    id INT PRIMARY KEY,
    good_name VARCHAR(255) UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    descr TEXT,
    img VARCHAR(255),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE categories (
    id INT PRIMARY KEY,
    category_name VARCHAR(255)
);


CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    current_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    cart JSON NOT NULL,
    total_price FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE wishlist (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    good_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (good_id) REFERENCES goods(id)
);


CREATE TABLE reviews (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    good_id INT NOT NULL,
    rate INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    review_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (good_id) REFERENCES goods(id)
);

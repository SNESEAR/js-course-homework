-- Super basic todo list

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
);


CREATE TABLE premium_info (
    user_id INT PRIMARY KEY,
    premium_until TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    bought_premium_at TIMESTAMP,
    auto_renew_premium BOOLEAN NOT NULL DEFAULT TRUE,
    payment_method VARCHAR(50),
    card_last_digits VARCHAR(4),
    billing_address VARCHAR(255),
    subscription_type VARCHAR(20) NOT NULL DEFAULT 'monthly',
    discount_code VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE tasks (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    descr TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    reminder BOOLEAN NOT NULL DEFAULT FALSE,
    reminder_date1 TIMESTAMP,
    reminder_date2 TIMESTAMP,
    reminder_date3 TIMESTAMP,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    recurring_period VARCHAR(20),
    recurring_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

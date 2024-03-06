BEGIN;

    CREATE TABLE user (
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        first_name VARCHAR(44) NOT NULL,
        last_name VARCHAR(44),
        email VARCHAR(100) NOT NULL,
        position VARCHAR(60) NOT NULL,
        password VARCHAR(60) NOT NULL,
        team VARCHAR(60),
        created_at DATE,
        updated DATE
    );

    CREATE TABLE user_assets (
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(455),
        quantity INT NOT NULL DEFAULT 0,
        assignee VARCHAR(36) NOT NULL,
        status ENUM('Active', 'Returned', 'damaged') DEFAULT 'Active' NOT NULL,
        created_at DATE,
        updated DATE,
        FOREIGN KEY (assignee) REFERENCES user(id)
    );
COMMIT;
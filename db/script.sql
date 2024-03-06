BEGIN;
    CREATE TABLE user_assets (
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(455),
        quantity INT NOT NULL DEFAULT 0,
        assignee VARCHAR(36) NOT NULL,
        status ENUM('Active', 'Inactive', 'Pending') DEFAULT 'Active' NOT NULL,
        created_at DATE,
        updated DATE,
        FOREIGN KEY (assignee) REFERENCES user(id)
    );
COMMIT;
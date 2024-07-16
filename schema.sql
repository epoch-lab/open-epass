CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE INDEX idx_email ON users(email);


CREATE TABLE admins (
	admin_name TEXT PRIMARY KEY,
	password TEXT NOT NULL
);


CREATE TABLE apps (
	app_id INTEGER PRIMARY KEY AUTOINCREMENT,
    app_name TEXT UNIQUE,
	app_secret TEXT NOT NULL,
    redirect_url TEXT NOT NULL,
    -- permissions TEXT NOT NULL,
    -- permissions_date TEXT NOT NULL,
    attributes TEXT NOT NULL
);


-- CREATE TABLE user_authorizations (
--     userid INTEGER,
--     appid INTEGER,
--     authorization_date TEXT NOT NULL,
--     PRIMARY KEY (userid, appid)
-- );


CREATE TABLE user_data (
    user_id INTEGER,
    scope_key TEXT,
    scope_value TEXT NOT NULL,
    PRIMARY KEY (user_id, scope_key)
);

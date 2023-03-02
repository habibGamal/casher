CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    barcode VARCHAR(255) UNIQUE NOT NULL,
    buying_price DOUBLE DEFAULT 0,
    selling_price DOUBLE DEFAULT 0,
    minimum_stock TINYINT NULL,
    has_expire_date BOOLEAN DEFAULT 0,
    -- 0 = unit, 1 = weight
    unit_or_weight BOOLEAN DEFAULT 0,
    unit VARCHAR(255) NOT NULL,
    product_group_id  INT UNSIGNED DEFAULT 1,
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (product_group_id) REFERENCES product_groups(id) ON DELETE SET NULL
);
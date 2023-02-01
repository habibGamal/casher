CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    barcode VARCHAR(255) NOT NULL,
    buying_price DOUBLE NOT NULL,
    selling_price DOUBLE NOT NULL,
    minimum_stock TINYINT NULL,
    has_expire_date BOOLEAN NOT NULL,
    unit_or_weight BOOLEAN NOT NULL,
    unit VARCHAR(255) NOT NULL,
    product_group_id  INT UNSIGNED NULL,
    bigger_unit_id  INT UNSIGNED NULL,
    PRIMARY KEY (id)
);
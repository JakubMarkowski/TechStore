const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to DB");
        //db.run("DROP TABLE products, categories, orders");
        db.run(`CREATE TABLE products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            price INTEGER,
            category TEXT,
            description TEXT,
            image TEXT)`, (err) => {
            if (err) {
                console.log("Table existing");
            } else {
                let insert = `INSERT INTO products(title, price, category, description, image) VALUES(?,?*4,?,?,?)`;
                db.run(insert, ['Intel Core i7-9700K', 199.99, 'CPU', 'Description of CPU1', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Ryzen 5 3600', 249.99, 'CPU', 'Description of CPU2', 'https://via.placeholder.com/150']);
                db.run(insert, ['Intel Core i9-9900K', 179.99, 'CPU', 'Description of CPU3', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Ryzen 9 3900X', 299.99, 'CPU', 'Description of CPU4', 'https://via.placeholder.com/150']);
                db.run(insert, ['Intel Core i5-10600K', 199.99, 'CPU', 'Description of CPU5', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Ryzen 7 5800X', 249.99, 'CPU', 'Description of CPU6', 'https://via.placeholder.com/150']);
                db.run(insert, ['Intel Core i7-10700K', 179.99, 'CPU', 'Description of CPU7', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Ryzen 5 5600X', 299.99, 'CPU', 'Description of CPU8', 'https://via.placeholder.com/150']);
                db.run(insert, ['Intel Core i9-10900K' ,199.99, 'CPU', 'Description of CPU9', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Ryzen 9 3950X', 249.99, 'CPU', 'Description of CPU10', 'https://via.placeholder.com/150']);
                db.run(insert, ['NVIDIA GeForce RTX 3080', 399.99, 'GPU', 'Description of GPU1', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Radeon RX 6800 XT', 499.99, 'GPU', 'Description of GPU2', 'https://via.placeholder.com/150']);
                db.run(insert, ['NVIDIA GeForce RTX 3090', 349.99, 'GPU', 'Description of GPU3', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Radeon RX 6900 XT', 599.99, 'GPU', 'Description of GPU4', 'https://via.placeholder.com/150']);
                db.run(insert, ['NVIDIA GeForce RTX 3070', 399.99, 'GPU', 'Description of GPU5', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Radeon RX 6700 XT', 499.99, 'GPU', 'Description of GPU6', 'https://via.placeholder.com/150']);
                db.run(insert, ['NVIDIA GeForce RTX 3060', 349.99, 'GPU', 'Description of GPU7', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Radeon RX 6600 XT', 599.99, 'GPU', 'Description of GPU8', 'https://via.placeholder.com/150']);
                db.run(insert, ['NVIDIA GeForce RTX 2080', 399.99, 'GPU', 'Description of GPU9', 'https://via.placeholder.com/150']);
                db.run(insert, ['AMD Radeon RX 5700 XT', 499.99, 'GPU', 'Description of GPU10', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair Vengeance RGB Pro 16GB (2x8GB)', 99.99, 'RAM', 'Description of RAM1', 'https://via.placeholder.com/150']);
                db.run(insert, ['G.Skill Trident Z RGB 32GB (2x16GB)', 129.99, 'RAM', 'Description of RAM2', 'https://via.placeholder.com/150']);
                db.run(insert, ['HyperX Fury RGB 8GB', 79.99, 'RAM', 'Description of RAM3', 'https://via.placeholder.com/150']);
                db.run(insert, ['Crucial Ballistix 16GB (2x8GB)', 149.99, 'RAM', 'Description of RAM4', 'https://via.placeholder.com/150']);
                db.run(insert, ['ADATA XPG Spectrix D60G 32GB (2x16GB)', 99.99, 'RAM', 'Description of RAM5', 'https://via.placeholder.com/150']);
                db.run(insert, ['Team T-FORCE Vulcan Z 8GB', 129.99, 'RAM', 'Description of RAM6', 'https://via.placeholder.com/150']);
                db.run(insert, ['Kingston HyperX Fury Black 16GB (2x8GB)', 79.99, 'RAM', 'Description of RAM7', 'https://via.placeholder.com/150']);
                db.run(insert, ['Patriot Viper Steel Series 32GB (2x16GB)', 149.99, 'RAM', 'Description of RAM8', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair Vengeance LPX 8GB', 99.99, 'RAM', 'Description of RAM9', 'https://via.placeholder.com/150']);
                db.run(insert, ['Crucial Ballistix MAX RGB 16GB (2x8GB)', 129.99, 'RAM', 'Description of RAM10', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair RM750x', 149.99, 'PSU', 'Description of PSU1', 'https://via.placeholder.com/150']);
                db.run(insert, ['EVGA SuperNOVA 850 G5', 199.99, 'PSU', 'Description of PSU2', 'https://via.placeholder.com/150']);
                db.run(insert, ['Seasonic Focus GX-750', 129.99, 'PSU', 'Description of PSU3', 'https://via.placeholder.com/150']);
                db.run(insert, ['be quiet! Straight Power 11 750W', 249.99, 'PSU', 'Description of PSU4', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair CX550F RGB', 149.99, 'PSU', 'Description of PSU5', 'https://via.placeholder.com/150']);
                db.run(insert, ['Thermaltake Toughpower GF1 750W', 199.99, 'PSU', 'Description of PSU6', 'https://via.placeholder.com/150']);
                db.run(insert, ['Cooler Master MWE Gold 750 V2', 129.99, 'PSU', 'Description of PSU7', 'https://via.placeholder.com/150']);
                db.run(insert, ['NZXT C850', 249.99, 'PSU', 'Description of PSU8', 'https://via.placeholder.com/150']);
                db.run(insert, ['Antec Earthwatts Gold Pro 750W', 149.99, 'PSU', 'Description of PSU9', 'https://via.placeholder.com/150']);
                db.run(insert, ['SilverStone Strider Platinum ST1200-PT', 199.99, 'PSU', 'Description of PSU10', 'https://via.placeholder.com/150']);
                db.run(insert, ['NZXT H510', 79.99, 'Obudowa', 'Description of Obudowa1', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair 4000D Airflow', 99.99, 'Obudowa', 'Description of Obudowa2', 'https://via.placeholder.com/150']);
                db.run(insert, ['Phanteks Eclipse P400A', 69.99, 'Obudowa', 'Description of Obudowa3', 'https://via.placeholder.com/150']);
                db.run(insert, ['Fractal Design Meshify C', 119.99, 'Obudowa', 'Description of Obudowa4', 'https://via.placeholder.com/150']);
                db.run(insert, ['Cooler Master MasterBox TD500 Mesh', 79.99, 'Obudowa', 'Description of Obudowa5', 'https://via.placeholder.com/150']);
                db.run(insert, ['Lian Li Lancool II Mesh', 99.99, 'Obudowa', 'Description of Obudowa6', 'https://via.placeholder.com/150']);
                db.run(insert, ['NZXT H710i', 69.99, 'Obudowa', 'Description of Obudowa7', 'https://via.placeholder.com/150']);
                db.run(insert, ['Corsair Obsidian 500D RGB SE', 119.99, 'Obudowa', 'Description of Obudowa8', 'https://via.placeholder.com/150']);
                db.run(insert, ['Phanteks Enthoo Pro II', 79.99, 'Obudowa', 'Description of Obudowa9', 'https://via.placeholder.com/150']);
                db.run(insert, ['Fractal Design Define 7', 99.99, 'Obudowa', 'Description of Obudowa10', 'https://via.placeholder.com/150']);
            }
        });
        db.run(`CREATE TABLE categories(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT
        )`, (err) => {
            if (err) {
                console.log("Table existing");
            } else {
                let insert = `INSERT INTO categories(type) VALUES(?)`;
                db.run(insert, ["CPU"]);
                db.run(insert, ["GPU"]);
                db.run(insert, ["PSU"]);
                db.run(insert, ["Obudowa"]);
                db.run(insert, ["RAM"]);
            }
        });
        db.run
    }
});

module.exports = db;

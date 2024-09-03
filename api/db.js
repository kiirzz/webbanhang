import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
    'vgshop',
    'root',
    'minh0123',
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
);

  // --------------------------User-----------------------------------------

export const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

 // --------------------------Game-----------------------------------------

 export const Game = sequelize.define("games", {
    game_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    publisher_id: {
        type: DataTypes.STRING,
        references: {
            model: "publishers",
            key: "publisher_id",
        },
        allowNull: false
    },
    category_id: {
        type: DataTypes.STRING,
        references: {
            model: "categories",
            key: "category_id",
        },
        allowNull: false
    },
    game_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sold_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    released: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

 // --------------------------Publisher-----------------------------------------

 export const Publisher = sequelize.define("publishers", {
    publisher_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    publisher_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

 // --------------------------Category-----------------------------------------

 export const Category = sequelize.define("categories", {
    category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// --------------------------Cart-----------------------------------------

export const Cart = sequelize.define("cart", {
    cart_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
});

 // --------------------------Order-----------------------------------------

 export const Order = sequelize.define("orders", {
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: "users",
            key: "user_id",
        },
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

// --------------------------CartItem-----------------------------------------

export const CartItem = sequelize.define("cart_item", {});

Game.belongsToMany(Cart, { through: CartItem })
Cart.belongsToMany(Game, { through: CartItem })

// --------------------------OrderGame-----------------------------------------

export const OrderGame = sequelize.define("order_game", {});

Game.belongsToMany(Order, { through: OrderGame });
Order.belongsToMany(Game, { through: OrderGame });

// Sync models
sequelize.sync().then(() => {
    console.log('Models created successfully!');
 }).catch((error) => {
    console.error('Models created failed!', error);
 });
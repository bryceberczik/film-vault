import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class extending Sequelize's Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define the UserFactory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'unique_username',
          msg: 'Username must be unique',
        },
        validate: {
          notContains: ' ',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 20],
            msg: 'Password must be at least 8 characters long',
          },
          is: {
            args: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
            msg: 'Password must contain at least one number and one special character',
          },
        },
      },
    },
    {
      tableName: 'users',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Before creating a new user, hash and set the password
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        // Before updating a user, hash and set the new password if it has changed
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  return User;  // Return the initialized User model
}

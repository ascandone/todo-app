import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const SECRET = "secret"; // TODO get from env
const saltRounds = 10;

type JwtPayload = {
  username: string;
  password: string;
};

export interface IUserEntity {
  username: string;
  hashedPassword: string;
}

export interface AuthService<UserEntity> {
  findUserByUsername(username: string): Promise<UserEntity | null>;
  createUser(user: {
    username: string;
    hashedPassword: string;
  }): Promise<UserEntity>;
}

export class Auth<UserEntity extends IUserEntity> {
  constructor(private readonly service: AuthService<UserEntity>) {}

  private signUser(user: UserEntity) {
    const payload: JwtPayload = {
      username: user.username,
      password: user.hashedPassword,
    };

    return sign(payload, SECRET);
  }

  async loginUser(args: { username: string; password: string }) {
    const user = await this.service.findUserByUsername(args.username);

    if (user === null) {
      return null;
    }

    const isValid = await compare(args.password, user.hashedPassword);
    if (!isValid) {
      return null;
    }

    const authToken = this.signUser(user);

    return {
      username: args.username,
      authToken,
    };
  }

  async getAuthorizedUser(authToken: string): Promise<UserEntity> {
    try {
      // TODO proper decoding insted of casting
      const payload = verify(authToken, SECRET) as JwtPayload;

      const user = await this.service.findUserByUsername(payload.username);

      if (user === null) {
        throw new Error("User does not exist");
      }

      if (payload.password !== user?.hashedPassword) {
        throw new Error("User is not authenticated (invalid password)");
      }

      return user;
    } catch (error) {
      throw new Error("User is not authenticated (Invalid token)");
    }
  }

  async registerUser(args: { username: string; password: string }) {
    const hashedPassword = await hash(args.password, saltRounds);

    const newUser = await this.service.createUser({
      username: args.username,
      hashedPassword,
    });

    const authToken = this.signUser(newUser);

    return {
      username: newUser.username,
      authToken,
    };
  }
}

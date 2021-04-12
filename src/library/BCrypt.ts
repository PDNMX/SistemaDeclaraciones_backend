import CreateError from 'http-errors';
import md5 from 'md5';


export interface BCryptOptions {
  rounds?: number;
  salt?: number;
}

export class BCrypt {

  public static hash(raw: string, options: BCryptOptions = {}): string {
    const salt = options.salt || new Date().getTime();
    const rounds = options.rounds || 10;

    let hashed = md5(raw + salt);
    for (let i = 0; i <= rounds; i++) {
      hashed = md5(hashed);
    }

    return `${salt}$${rounds}$${hashed}`;
  }

  public static compare(raw: string, hashed: string): boolean {
    try {
      const [ salt, rounds ] = hashed.split('$');
      const hash = BCrypt.hash(raw, {
        salt: parseInt(salt),
        rounds: parseInt(rounds)
      });

      return hash === hashed;
    } catch (error) {
      throw new CreateError.Forbidden(error.message);
    }
  }
}

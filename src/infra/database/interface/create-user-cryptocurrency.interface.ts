import { Cryptocurrency } from '../models/cryptocurrency/cryptocurrency';
import { User } from '../models/user/user.entity';

export interface ICreateUserCryptocurrency {
  user: User;
  cryptocurrency: Cryptocurrency;
}

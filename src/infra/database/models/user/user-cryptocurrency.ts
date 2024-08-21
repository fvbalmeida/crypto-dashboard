import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Cryptocurrency } from '../cryptocurrency/cryptocurrency';

import { User } from './user.entity';

@Entity({ name: 'user_cryptocurrency' })
export class UserCryptocurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCryptocurrencies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cryptocurrency, (cryptocurrency) => cryptocurrency.userCryptocurrencies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cryptocurrency_id' })
  cryptocurrency: Cryptocurrency;
}

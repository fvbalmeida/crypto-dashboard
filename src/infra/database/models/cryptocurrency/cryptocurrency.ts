import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

import { UserCryptocurrency } from '../user/user-cryptocurrency';

@Entity({ name: 'cryptocurrency' })
export class Cryptocurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  symbol: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => UserCryptocurrency, (userCryptocurrency) => userCryptocurrency.cryptocurrency)
  userCryptocurrencies: UserCryptocurrency[];
}

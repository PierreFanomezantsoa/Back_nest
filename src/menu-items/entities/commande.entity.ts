import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('commande')
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  table_number: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  order_number: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  total_amount: string;

  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 200 })
  items: string;

   // Changement ici : timestamp modifiable
  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

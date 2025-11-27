import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, nullable: true })
  nom: string;

  @Column({ length: 200 })
  description: string;

  @Column({ nullable: true })
  prix: number;

  @Column()
  prixPromo: number;

  @Column({ length: 200 })
  image: string; // ✔ obligatoire
}

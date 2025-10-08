import { IsNotEmpty } from 'class-validator';
import {Column,Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn,} from 'typeorm';


@Entity({ name: 'tb_usuario' })
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  email: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  foto: string;

  // descomentar quando criar a entidade produto
 // @OneToMany(() => Produto, (produto) => oportunidade.cliente)
 // oportunidades: Oportunidade[];
}
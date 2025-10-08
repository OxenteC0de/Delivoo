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

  @ManyToOne(() => Usuario, (usuario) => usuario.clientes, { eager: false })
  usuario: Usuario;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
  oportunidades: Oportunidade[];
}
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
  @Column({ length: 100, nullable: false })
  foto: string;

  @Column({
    type: 'enum',
    enum: StatusContrato,
    default: StatusContrato.PENDENTE,
  })
  statusContrato: StatusContrato;

  @ManyToOne(() => Usuario, (usuario) => usuario.clientes, { eager: false })
  usuario: Usuario;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
  oportunidades: Oportunidade[];
}
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  quantidade: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  preco: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}

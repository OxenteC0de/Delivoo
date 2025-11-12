import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @ApiProperty({ description: 'Identificador único do produto' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Suco de laranja natural',
  })
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Feito com laranjas frescas e sem adição de açúcar.',
  })
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @ApiProperty({
  description: 'URL da foto do produto',
  example: 'https://exemplo.com/foto.jpg',
  required: false,
  })
  @Column({ length: 500, nullable: true })
  foto: string;

  @ApiProperty({ description: 'Quantidade disponível em estoque', example: 50 })
  @IsNotEmpty()
  @Column({ nullable: false })
  quantidade: number;

  @ApiProperty({ description: 'Preço do produto', example: '9.90' })
  @IsNotEmpty()
  @Column({ nullable: false })
  preco: string;

  @ApiProperty({ description: 'Indica se o produto é saudável', example: true })
  @IsNotEmpty()
  @Column({ default: true })
  saudavel: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}

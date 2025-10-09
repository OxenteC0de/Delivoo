import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @ApiProperty({ description: 'Identificador único do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'William Martins',
  })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário (login)',
    example: 'william@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  usuario: string;

  @ApiProperty({ description: 'Senha do usuário', example: '12345678' })
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @ApiProperty({
    description: 'URL da foto do usuário',
    example: 'http://foto.com/foto.jpg',
    required: false,
  })
  @Column({ length: 5000, nullable: true })
  foto: string;

  @ApiProperty({
    type: () => [Produto],
    description: 'Lista de produtos cadastrados pelo usuário',
    required: false,
  })
  @OneToMany(() => Produto, (produto) => produto.usuario)
  produtos: Produto[];
  produto: any;
}

import { IsEmail ,IsNotEmpty, MinLength } from 'class-validator';
import {Column,Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn,} from 'typeorm';


@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string

    @Column({length: 5000 }) 
    foto: string


  // descomentar quando criar a entidade produto
 // @OneToMany(() => Produto, (produto) => produto.usuario)
 // produtos: Produto[];
}
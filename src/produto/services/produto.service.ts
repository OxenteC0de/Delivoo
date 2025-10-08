import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  findOne: any;
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }

  //Metodo adds
  //Métodos extras
  async marcarSaudavel(id: number): Promise<Produto> {
    const produto = await this.findById(id);

    if (produto.saudavel === true) {
      throw new HttpException(
        'O produto já está marcado como saudável 😀',
        HttpStatus.BAD_REQUEST,
      );
    }

    produto.saudavel = true;
    return await this.produtoRepository.save(produto);
  }

  async marcarNaoSaudavel(id: number): Promise<Produto> {
    const produto = await this.findById(id);

    if (produto.saudavel === false) {
      throw new HttpException(
        'O produto já está marcado como não saudável 🤮',
        HttpStatus.BAD_REQUEST,
      );
    }

    produto.saudavel = false;
    return await this.produtoRepository.save(produto);
  }

  async recomendarProdutosSaudaveis(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        saudavel: true,
      },
      relations: {
        categoria: true,
      },
    });
  }
}

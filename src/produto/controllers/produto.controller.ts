import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  HttpException,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@UseGuards(JwtAuthGuard)
@Controller('/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  //metodos adicionais
  @Get('/recomendacoes')
  @HttpCode(HttpStatus.OK)
  recomendarProdutosSaudaveis(): Promise<Produto[]> {
    return this.produtoService.recomendarProdutosSaudaveis();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }

  //metodos adicionais
  @Patch(':id/saudavel')
  marcaSaudavel(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.marcarSaudavel(id);
  }

  //metodos adicionais

  @Patch(':id/nao-saudavel')
  marcaNaoSaudavel(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.marcarNaoSaudavel(id);
  }
}

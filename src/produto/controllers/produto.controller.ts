import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('produtos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // ============ CONSULTAS (GET) ============

  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
    type: [Produto],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @ApiOperation({ summary: 'Listar produtos saudáveis recomendados' })
  @ApiResponse({
    status: 200,
    description: 'Produtos saudáveis retornados',
    type: [Produto],
  })
  @Get('/recomendacoes')
  @HttpCode(HttpStatus.OK)
  recomendarProdutosSaudaveis(): Promise<Produto[]> {
    return this.produtoService.recomendarProdutosSaudaveis();
  }

  @ApiOperation({ summary: 'Buscar produtos por nome' })
  @ApiResponse({
    status: 200,
    description: 'Produtos encontrados',
    type: [Produto],
  })
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @ApiOperation({ summary: 'Listar produto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
    type: Produto,
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  // ============ CRIAÇÃO (POST) ============

  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    type: Produto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  // ============ ATUALIZAÇÃO (PUT/PATCH) ============

  @ApiOperation({ summary: 'Atualizar um produto existente' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
    type: Produto,
  })
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @ApiOperation({ summary: 'Marcar produto como saudável' })
  @ApiResponse({
    status: 200,
    description: 'Produto marcado como saudável',
    type: Produto,
  })
  @Patch('/:id/saudavel')
  marcaSaudavel(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.marcarSaudavel(id);
  }

  @ApiOperation({ summary: 'Marcar produto como não saudável' })
  @ApiResponse({
    status: 200,
    description: 'Produto marcado como não saudável',
    type: Produto,
  })
  @Patch('/:id/nao-saudavel')
  marcaNaoSaudavel(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.marcarNaoSaudavel(id);
  }

  // ============ EXCLUSÃO (DELETE) ============

  @ApiOperation({ summary: 'Deletar um produto por ID' })
  @ApiResponse({ status: 204, description: 'Produto deletado com sucesso' })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}

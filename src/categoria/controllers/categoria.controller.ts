import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('Categoria')
@ApiBearerAuth() // se quiser proteger as rotas com JWT
@UseGuards(JwtAuthGuard)
@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // ============ CONSULTAS (GET) ============
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso.',
  })
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar categorias por descrição' })
  @ApiResponse({
    status: 200,
    description: 'Categorias encontradas com sucesso.',
  })
  findAllByDescricao(
    @Param('descricao') descricao: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findAllByDescricao(descricao);
  }

  // ============ CRIAÇÃO (POST) ============
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  // ============ ATUALIZAÇÃO (PUT) ============
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar uma categoria existente' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  // ============ EXCLUSÃO (DELETE) ============
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar uma categoria pelo ID' })
  @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.delete(id);
  }
}

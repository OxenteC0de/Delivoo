import { ProdutoModule } from './produto/produto.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { AppController } from './app.controller';

@Module({
  imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
	useClass: ProdService,
  imports: [ConfigModule],
  }),
    AuthModule,
    ProdutoModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { ProdutoEstoqueFormComponent } from './../pages/produto-estoque-form/produto-estoque-form.component';
import { Routes } from '@angular/router';

import { ProdutosComponent } from '../pages/produtos/produtos.component';
import { ProdutoTiposComponent } from '../pages/produto-tipos/produto-tipos.component';
import { ProdutoTipoFormComponent } from '../pages/produto-tipo-form/produto-tipo-form.component';
import { ProdutoFormComponent } from '../pages/produto-form/produto-form.component';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produto-tipos', component: ProdutoTiposComponent },
  { path: 'produto/:id', component: ProdutoFormComponent },
  { path: 'produto', component: ProdutoFormComponent },
  { path: 'produto-tipo/:id', component: ProdutoTipoFormComponent },
  { path: 'produto-tipo', component: ProdutoTipoFormComponent },
  { path: 'produto/:id/estoque', component: ProdutoEstoqueFormComponent },
];

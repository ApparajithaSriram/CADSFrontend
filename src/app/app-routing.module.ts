import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeCategoriesComponent } from './pages/attribute-categories/attribute-categories.component';

const routes: Routes = [  
  { path: 'cancer/categories', component: AttributeCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

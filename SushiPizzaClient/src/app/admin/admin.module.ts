import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { GraphicComponent } from './graphic/graphic.component';


@NgModule({
  declarations: [
    UserListComponent,
    GraphicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'user-list', component: UserListComponent },
      { path: 'graphic', component: GraphicComponent }
    ])
  ]
})
export class AdminModule { }

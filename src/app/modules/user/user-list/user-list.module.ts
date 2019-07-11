import { NgModule } from '@angular/core';
import { UserListRouter } from './user-list.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        UserListRouter
    ],
    declarations: [UserListComponent]
})
export class UserListModule { }

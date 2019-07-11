import { NgModule } from '@angular/core';
import { UserViewRouter } from './user-view.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserViewRouter,
        SharedModule
    ],
    declarations: [UserViewComponent]
})
export class UserViewModule { }

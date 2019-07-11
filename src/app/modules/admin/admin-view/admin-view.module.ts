import { NgModule } from '@angular/core';
import { AdminViewRouter } from './admin-view.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './admin-view.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminViewRouter,
        SharedModule
    ],
    declarations: [AdminViewComponent]
})
export class AdminViewModule { }

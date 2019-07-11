import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { CreateViewRouter } from './create-view.routing';
import { CreateViewComponent } from './create-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreateViewRouter,
        SharedModule
    ],
    declarations: [CreateViewComponent]
})
export class CreateViewModule { }

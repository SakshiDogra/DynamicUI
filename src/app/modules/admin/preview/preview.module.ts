import { NgModule } from '@angular/core';
import { PreViewRouter } from './preview.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PreViewRouter,
        SharedModule
    ],
    declarations: [PreviewComponent]
})
export class PreViewModule { }

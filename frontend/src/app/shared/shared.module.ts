import { NgModule } from "@angular/core";
import { LayoutModule } from './layout/layout.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [
        LayoutModule,
        MatSliderModule
    ],
    declarations: [],
    exports: [
        LayoutModule,
        MatSliderModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule
    ],
    providers: []
})
export class SharedModule {}
import { FaultDiagramComponent } from "./pages/fault-diagram.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatatableComponent } from './pages/faultsDatatable/datatable.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { FaultDiagramService } from './http/faultdiagram.service';
import { HttpClientModule } from '@angular/common/http';
import { EditFaultDiagramComponent } from './pages/edit-fault-diagram/edit-fault-diagram.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MachineService } from '../Machines/http/machines.service';

const routes: Routes = [
    { path: '', component: FaultDiagramComponent},
    { path: 'edit/:id', component: EditFaultDiagramComponent}
];

@NgModule({
    declarations: [
        FaultDiagramComponent,
        DatatableComponent,
        EditFaultDiagramComponent
    ],
    imports: [RouterModule.forChild(routes), 
        SharedModule, 
        MatSliderModule, 
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [FaultDiagramService, MachineService],
    exports: [CommonModule]
})
export class FaultDiagramModule {}
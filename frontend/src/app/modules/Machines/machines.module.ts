import { MachinesComponent } from "./pages/machine.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MachineDetailsComponent } from './pages/machinesdetails/machine-details.component';
import { MachineService } from './http/machines.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddMachineComponent } from './pages/add-machine/add-machine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewMachineComponent } from './pages/machinesdetails/add-new-machine/add-new-machine.component';
import { EditMachineTypeComponent } from './pages/edit-machine-type/edit-machine.component';
import { EditMachineComponent } from './pages/machinesDetails/edit-machine/edit-machine.component';

const routes: Routes = [
    { path: '', component: MachinesComponent},
    { path: 'details/:id', component: MachineDetailsComponent},
    { path: 'add/:id', component: AddNewMachineComponent},
    { path: 'add', component: AddMachineComponent},
    { path: 'edit/:id', component: EditMachineTypeComponent},
    { path: 'details/edit/:id', component: EditMachineComponent},
];

@NgModule({
    declarations: [
        MachinesComponent,
        MachineDetailsComponent,
        AddMachineComponent,
        AddNewMachineComponent,
        EditMachineTypeComponent,
        EditMachineComponent
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
    providers: [MachineService],
    exports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class MachinesModule {}
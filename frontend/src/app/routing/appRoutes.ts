import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../modules/Machines/machines.module').then(m => m.MachinesModule)
    },
    {
        path: 'faultdiagram',
        loadChildren: () => import('../modules/FaultDiagram/fault-diagram.module').then(m => m.FaultDiagramModule)
    },
    {
        path: 'machines',
        loadChildren: () => import('../modules/Machines/machines.module').then(m => m.MachinesModule)
    },
    {
        path: 'statistics',
        loadChildren: () => import('../modules/Statistics/statistics.module').then(m => m.StatisticsModule)
    }
]
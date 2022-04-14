import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FaultDiagramService } from '../../http/faultdiagram.service';
import { FaultDiagram } from '../../http/response/faultdiagram';
import { MachineService } from 'src/app/modules/Machines/http/machines.service';
import { EditedFaultDiagram } from '../../http/response/editedfaultdiagram';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'datatable',
  styleUrls: ['datatable.component.scss'],
  templateUrl: 'datatable.component.html',
})
export class DatatableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'machineType', 'edit'];
  dataSource: MatTableDataSource<EditedFaultDiagram>;
  faults: FaultDiagram[];
  editedFaults: EditedFaultDiagram[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private faultService: FaultDiagramService,
    private machineService: MachineService
  ) {
  }

  ngOnInit() {
    this.getData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.sort);
  }

  async getData(){
     await this.faultService.findAll().subscribe(data => {
      this.faults = data;
      this.faults.forEach(fault => {
        this.machineService.find(fault.machine_type).subscribe(res=>{
          const editedFault = new EditedFaultDiagram();
          editedFault.id = fault.id,
          editedFault.fault_name = fault.fault_name,
          editedFault.machine_type = res.name
          this.editedFaults.push(editedFault);
          console.log(this.editedFaults);
          this.update();
        })
      });
    });
  }

  update(){
    this.dataSource = new MatTableDataSource(this.editedFaults);
  }


  translate(fault: FaultDiagram){
    this.machineService.find(fault.machine_type).subscribe(res=>{
      const editedFault = new EditedFaultDiagram();
      editedFault.id = fault.id,
      editedFault.fault_name = fault.fault_name,
      editedFault.machine_type = res.name
      this.editedFaults.push(editedFault);
      console.log(this.editedFaults);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(diagram: FaultDiagram){
    this.faultService.delete(diagram.id).subscribe(
      () => {
        window.location.reload();
        //this.getData();
      }
    )
  }

}
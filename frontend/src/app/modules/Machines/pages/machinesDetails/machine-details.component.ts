import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Machine } from '../../http/response/machine';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from '../../http/machines.service';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-machine-details',
  styleUrls: ['machine-details.component.scss'],
  templateUrl: 'machine-details.component.html',
})
export class MachineDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'line', 'count', 'status', 'mail', 'edit'];
  resultsLength = null;
  id = null;
  
  dataSource: MatTableDataSource<Machine>;

  machines: Machine[];
  machine: Machine = new Machine();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private machineService: MachineService, 
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
    ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    this.getData(id);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pages(){
    let num = this.machines.length;
    let o = num/30;
    let pages = 0; 
    for (let i = 0; i<o; i++){
      pages++;
    }
    this.resultsLength = pages;
  }

  getData(id: number){
    this.machineService.findById(id).subscribe(res => {
        this.machines = res;
        this.dataSource = new MatTableDataSource(this.machines);
        this.pages();
      }
    );
  }

  delete(machine: Machine): void{
    this.machineService.deleteMachineEntity(machine.id).subscribe(
      () => {
        this.getData(this.id);
      }
    );
  }

  navigate(){
    this.router.navigate(['/machines']).then(() =>{
      window.location.reload();
    });
  }
}
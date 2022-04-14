import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from '../../../http/machines.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MachineEntity } from '../../../http/response/machineEntity';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineComponent implements OnInit {

  public newMachine: MachineEntity = new MachineEntity();
  id = null;
  public machine: MachineEntity = new MachineEntity();
  public asdMachine: MachineEntity = new MachineEntity();
  public year;
  public month;
  public day;
  public date;

  constructor(
    private router: Router,
    private machineService: MachineService,
    private location: Location,
    private route: ActivatedRoute,
    ){}

  editMachineForm = new FormGroup({
    name: new FormControl(),
    line: new FormControl(),
    status: new FormControl(),
    email: new FormControl(),
    commissionDate: new FormControl()
  });

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.getData(this.id);
  }

  getData(id: number){
    this.machineService.findMachine(id).subscribe(res =>{
      this.machine = res;
    })
  }

  onSubmit(): void {
    this.newMachine.id = this.id;
    this.newMachine.machineTypeId = this.machine.machineTypeId;
    this.newMachine.name = this.editMachineForm.get('name').value;
    this.newMachine.line = this.editMachineForm.get('line').value;
    this.newMachine.faultsCount = this.machine.faultsCount;
    this.newMachine.status = this.editMachineForm.get('status').value;
    this.newMachine.mail = this.editMachineForm.get('email').value;
    this.newMachine.commissionDate = this.editMachineForm.get('commissionDate').value;

    console.log(this.newMachine);

    this.machineService.saveEditedMachineEntity(this.id, this.newMachine);
    this.router.navigate(['/machines/details/' + this.machine.machineTypeId]).then(() =>{
      window.location.reload();
    });
  }

  back(){
    this.location.back();
  }

}

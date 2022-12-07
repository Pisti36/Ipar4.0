import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from '../../../http/machines.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MachineEntity } from '../../../http/response/machineEntity';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})
export class AddNewMachineComponent implements OnInit {

  public newMachine: MachineEntity = new MachineEntity();
  id = null;

  constructor(
    private router: Router,
    private machineService: MachineService,
    private location: Location,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
  }

  addNewMachineForm = new FormGroup({
    name: new FormControl(),
    line: new FormControl(),
    status: new FormControl(),
    email: new FormControl(),
    commissionDate: new FormControl()
  });

  onSubmit(): void {
    this.newMachine.machineTypeId = this.id;
    this.newMachine.name = this.addNewMachineForm.get('name').value;
    this.newMachine.line = parseInt(this.addNewMachineForm.get('line').value);
    this.newMachine.faultsCount = 0;
    this.newMachine.status = parseInt(this.addNewMachineForm.get('status').value);
    this.newMachine.mail = this.addNewMachineForm.get('email').value;
    this.newMachine.commissionDate = this.addNewMachineForm.get('commissionDate').value;

    console.log(this.newMachine);

    console.log(this.machineService.saveMachineEntity(this.newMachine));
    this.router.navigate(['/machines/details/' + this.id]).then(() =>{
      window.location.reload();
    });

  }

  back(){
    this.location.back();
  }

}

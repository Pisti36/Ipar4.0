import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MachineService } from '../../http/machines.service';
import { Machine } from '../../http/response/machine';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent {
  
  public newMachine: Machine = new Machine();

  constructor(
    private router: Router,
    private machineService: MachineService,
    private location: Location
    ){}

  addMachineForm = new FormGroup({
    machineName: new FormControl(),
    imageLink: new FormControl("http://vm.ik.bme.hu:5631/ipar4/images/machine.jpg"),
    comment: new FormControl()
  });

  onSubmit(): void {
    this.newMachine.name = this.addMachineForm.get('machineName').value;
    this.newMachine.image = this.addMachineForm.get('imageLink').value;
    this.newMachine.comment = this.addMachineForm.get('comment').value;

    console.log(this.newMachine);

    this.machineService.save(this.newMachine);
    this.router.navigate(['/machines']).then(() =>{
      window.location.reload();
    });
  }

  back(){
    this.location.back();
  }

}

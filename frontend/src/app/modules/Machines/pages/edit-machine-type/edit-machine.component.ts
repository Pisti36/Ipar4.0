import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MachineService } from '../../http/machines.service';
import { Machine } from '../../http/response/machine';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineTypeRequest } from '../../http/request/machineTypeRequest';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineTypeComponent implements OnInit {

  newMachine: MachineTypeRequest = new MachineTypeRequest();
  id = null;
  machine: Machine = new Machine();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachineService,
    private location: Location
    ){}

    editMachineForm = new FormGroup({
    machineName: new FormControl(),
    imageLink: new FormControl(),
    comment: new FormControl() 
  });

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    this.getData(id);
  }

  getData(id: number){
    this.machineService.find(id).subscribe(res => {
        this.machine = res;
      }
    );
  }

  fillForm(){
    this.editMachineForm = new FormGroup({
      machineName: new FormControl(this.machine.name),
      imageLink: new FormControl(this.machine.image),
      comment: new FormControl(this.machine.comment) 
    });  
  }


  onSubmit(): void {
    this.newMachine.name = this.editMachineForm.get('machineName').value;
    this.newMachine.image = this.editMachineForm.get('imageLink').value;
    this.newMachine.comment = this.editMachineForm.get('comment').value;
    console.log(this.editMachineForm.get('machineName').value)
    console.log(this.editMachineForm.get('imageLink').value)
    console.log(this.editMachineForm.get('comment').value)

    console.log(this.newMachine);

    this.machineService.saveEditedMachineType(this.id, this.newMachine);
    this.router.navigate(['/machines']).then(() =>{
      window.location.reload();
    });
  }

  back(){
    this.location.back();
  }

}

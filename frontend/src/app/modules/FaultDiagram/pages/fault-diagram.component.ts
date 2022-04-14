import { Component, OnInit } from '@angular/core';
import { FaultDiagram } from '../http/response/faultdiagram';
import { Router } from '@angular/router';
import { FaultDiagramService } from '../http/faultdiagram.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-fault-diagram',
  templateUrl: './fault-diagram.component.html',
  styleUrls: ['./fault-diagram.component.scss']
})
export class FaultDiagramComponent implements OnInit {

  faults: FaultDiagram[];
  newDiagram: FaultDiagram = new FaultDiagram();
  
  headers = ["id", "fault_name"];
  
  constructor(private router: Router,
    private faultService: FaultDiagramService) { }

    addDiagramForm = new FormGroup({
      diagramName: new FormControl(),
      machineType: new FormControl()
    });

    onSubmit(): void {
      this.newDiagram.fault_name = this.addDiagramForm.get('diagramName').value;
      this.newDiagram.machine_type = this.addDiagramForm.get('machineType').value;  
  
      this.faultService.save(this.newDiagram).subscribe(
        () => {
          this.getData();
        }
      );
      this.router.navigate(['/faultdiagram']).then(() =>{
        window.location.reload();
      });
    }

  ngOnInit(): void {
    this.getData();
  }

  print(){
    console.log(this.faults);
  }

  getData(){
    this.faultService.findAll().subscribe(data => {
      this.faults = data;
      this.print();
    })
  }

}

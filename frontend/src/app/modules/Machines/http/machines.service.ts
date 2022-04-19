import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from './response/machine';
import { MachineEntity } from './response/machineEntity';
import { MachineTypeRequest } from './request/machineTypeRequest';

@Injectable()
export class MachineService {

  private machineList: string;
  private machineAdd: string;
  private machineDelete: string;
  private machineByMachineType: string;
  private machineListOne: string;

  private machineById: string;
  private addMachineEntity: string;
  private editMachineEntity: string;
  private listMachineEntitiesUrl: string;

  constructor(private http: HttpClient) {
    this.machineList = 'http://localhost:8080/machinetype/count';
    this.machineAdd = 'http://localhost:8080/machinetype/add';
    this.machineDelete = 'http://localhost:8080/machinetype/list/';
    this.machineListOne = 'http://localhost:8080/machinetype/list/';

    this.machineByMachineType = 'http://localhost:8080/machine/find/';
    this.machineById = 'http://localhost:8080/machine/find/';
    this.addMachineEntity = 'http://localhost:8080/machine/add';
    this.editMachineEntity = 'http://localhost:8080/machine/list/';
    this.listMachineEntitiesUrl = 'http://localhost:8080/machine/list';

  }

  public listMachineEntities(): Observable<MachineEntity[]> {
    return this.http.get<MachineEntity[]>(this.listMachineEntitiesUrl);
  }

  public findAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.machineList);
  }

  public save(machine: Machine) {
    return this.http.post<Machine>(this.machineAdd, machine).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  public saveEditedMachineType(id: number, machine: MachineTypeRequest) {
    return this.http.put<Machine>(this.machineListOne + id, machine).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  public delete(id: number): Observable<Object> {
    console.log(id);
    return this.http.delete(this.machineDelete + id);
 };

 public deleteMachineEntity(id: number): Observable<Object> {
  return this.http.delete(this.editMachineEntity + id);
};

 public listMachinesByMachineTypeId(id: number): Observable<MachineEntity[]> {
   return this.http.get<MachineEntity[]>(this.machineByMachineType + id)
 }

 public findById(id: number): Observable<Machine[]> {
  return this.http.get<Machine[]>(this.machineById + id)
 }

 public find(id: number): Observable<Machine> {
  return this.http.get<Machine>(this.machineListOne + id)
 }

 public saveMachineEntity(machine: MachineEntity) {
   return this.http.post<MachineEntity>(this.addMachineEntity, machine).subscribe(
    (res) => console.log(res),
    (err) => console.log(err),
  );
 }

 public findMachine(id: number) {
   return this.http.get<MachineEntity>(this.editMachineEntity + id);
 }

 public saveEditedMachineEntity(id: number, machine: MachineEntity) {
  return this.http.put<MachineEntity>(this.editMachineEntity + id, machine).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}
public getMachine(id: number){
  return this.http.get<MachineEntity>(this.editMachineEntity + id)
}
}

export class MachineEntity {
    id: number;
    machineTypeId: number;
    name: string;
    line: number;
    faultsCount: number;
    status: boolean;
    mail: string;
    commissionDate: Date;
}
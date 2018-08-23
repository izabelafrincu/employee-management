import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'angular-web-storage';
import { EmployeeTemplateComponent } from '../templates/employee.template';

@Component({
  selector: 'em-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    public globalsService: GlobalsService,
    public dateFormatter: NgbDateParserFormatter,
    protected modalService: NgbModal,
    protected localStorage: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  public editEmployee(index: number): void {
    const modalRef: any = this.modalService
      .open(EmployeeTemplateComponent);

    const currentEmployee = this.globalsService.employees[index];
    modalRef.componentInstance.value = {
      name: currentEmployee.name,
      hireDate: currentEmployee.hireDate,
    };

    modalRef.result
      .then(
        (result) => {
          this.globalsService.employees = this.globalsService.employees.map(
            (e, i) => {
              if (i !== index) { return e; }
              return result;
            }
          );
          this.localStorage.set('employees', this.globalsService.employees);
        },
        reason => {},
      );
  }

  public deleteEmployee(index: number): void {
    this.globalsService.employees.splice(index, 1);
    this.localStorage.set('employees', this.globalsService.employees);
  }
}

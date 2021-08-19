import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  displayedColumns = ['delete'];
  dataSource: MatTableDataSource<any>;
  loading;
  formGroup: FormGroup;


  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    this.formGroup = new FormGroup({
      values: new FormArray([])
    });
    this.loading = true;
    this.dataService.get().subscribe((res) => {
      if (!localStorage.getItem('mock')) localStorage.setItem('mock', JSON.stringify(res));
      res.result.forEach((el) => {
        let i = res.result.indexOf(el);
        for (const prop in el) {
          if (this.displayedColumns.indexOf(prop) === -1) this.displayedColumns.push(prop);
        }
      });
      for (const element of res.result) {
        const groupToAdd = new FormGroup({});
        for (const col of this.displayedColumns) {
          if(col!== 'delete') {
            if (!col.includes('Id')) {
              groupToAdd.addControl(col, new FormControl({value: element[col], disabled: false}));
            } else {
              groupToAdd.addControl(col, new FormControl({value: element[col], disabled: true}));

            }
          }
        }
        this.values.push(groupToAdd);
      }
      this.dataSource = new MatTableDataSource(res.result);
      console.log(this.formGroup);
      this.loading = false;
    });
  }

  get values() {
    return this.formGroup.get('values') as FormArray;
  }

  deleteElement(i: number) {
    this.dataService.remove(i).subscribe(() => {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    })
  }

  editElement(i: number) {
    this.dataService.update(i,  this.formGroup.value.values[i]).subscribe(() => {})
  }

  addRow(){
    this.dataService.addRow().subscribe(() => {
      this.dataSource.data.splice(0,0,{});
      this.dataSource._updateChangeSubscription();

      const groupToAdd = new FormGroup({});
      for (const col of this.displayedColumns) {
        if(col!== 'delete') {
          if (!col.includes('Id')) {
            groupToAdd.addControl(col, new FormControl({value: '', disabled: false}));
          } else {
            groupToAdd.addControl(col, new FormControl({value: '', disabled: true}));

          }
        }
      }
      this.values.insert(0, groupToAdd);
      console.log(this.values);
    });
  }
}

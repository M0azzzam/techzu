import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounce, debounceTime} from "rxjs";

@Component({
  selector: 'user-filter-component',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  filterForm!: FormGroup;
  @Output() filterList: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      country: new FormControl(''),
    });

    const subscription = this.filterForm.valueChanges.pipe(
      debounceTime(600)
    ).subscribe((value) => {
      this.filterList.emit(value);
    })
  }

}

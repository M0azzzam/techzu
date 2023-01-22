import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Subject, takeUntil} from "rxjs";
import {map} from 'rxjs/operators';
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'user-list-component',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input() users: any;
  @Input() pageSize: any;
  @Input() usersListTableInformation!: PageEvent;
  @Input() usersListTableSort!: Sort;
  @Input() count = 0;

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() tableInformation: EventEmitter<PageEvent> = new EventEmitter();
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter();
  @Output() tableSort: EventEmitter<Sort> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['select', 'user_name', 'country'];
  dataSource = [];
  selection = new SelectionModel<any>(true, []);
  selectedRow = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnChanges() {
    this.dataSource = this.users;
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange
        .pipe(
          takeUntil(this.destroy$),
          map((sortInformation) => this.tableSort.emit(sortInformation))
        )
        .subscribe();
      this.paginator.page
        .pipe(
          takeUntil(this.destroy$),
          map((val) => {
            if (val.pageSize !== this.usersListTableInformation.pageSize) {
              this.pageSizeChanged.emit(val.pageSize);
            }
            this.tableInformation.emit(val);
          })
        )
        .subscribe();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedRow = this.selection['_selected'];
      return;
    }

    this.selection.select(...this.dataSource);
    this.selectedRow = this.selection['_selected'];
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      this.selectedRow = this.selection['_selected'];
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    this.selectedRow = this.selection['_selected'];
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onSortChange(event: any) {
    // console.log(event)
  }

  onView(id: any) {
    this.router.navigate(['view', id], {relativeTo: this.activatedRoute});
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

  onEdit(id: any) {
    this.router.navigate(['edit', id], {relativeTo: this.activatedRoute});
  }

  onDelete() {
    const user_ids = this.selectedRow.map((row) => row['user_id']);
    if (user_ids.length > 0) {
      this.delete.emit({user_ids});
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

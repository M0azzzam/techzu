import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {filter, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddressDetailPopupComponent} from "../../../layout/address-detail-popup/address-detail-popup.component";
import {PromptComponent} from "../../../layout/prompt/prompt.component";

@Component({
  selector: 'user-detail-ui',
  templateUrl: './user-detail-ui.component.html',
  styleUrls: ['./user-detail-ui.component.scss']
})
export class UserDetailUiComponent implements OnInit, OnChanges {

  user: any;
  detailForm!: FormGroup;
  displayedColumns: string[] = ['select', 'state', 'city', 'address', 'zip_code', 'tel_no'];
  dataSource = []
  destroy$: Subject<boolean> = new Subject<boolean>();
  selection = new SelectionModel<any>(true, []);
  selectedRow = [];
  @Input() user_id!: boolean;
  @Input() isNew!: boolean;
  @Input() isView!: boolean;
  @Input() isEdit!: boolean;
  @Input() updateState!: any;

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  componentDialogRef!: MatDialogRef<AddressDetailPopupComponent>;
  componentPromptRef!: MatDialogRef<PromptComponent>;


  constructor(private formBuilder: FormBuilder, private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createDetailForm();
    const user_id = this.user_id;
    if (user_id && (this.isView || this.isEdit)) {
      this.getUserDetail(user_id)
    }
  };

  ngOnChanges() {
    if (this.updateState) {
      this.getUserDetail(this.user_id)
    }
  }

  getUserDetail(user_id: any) {
    this.userService.getUserDetail({user_id}).subscribe(({status, data}) => {
      if (status === 'OK') {
        this.user = data;
        this.setDetailForm(this.user);
        this.dataSource = this.user.address_details;
        this.setFieldsDisabled();
      }
    })
  }

  createDetailForm() {
    this.detailForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      country: ['', Validators.required],

    });
  }

  setDetailForm(user: any) {
    this.detailForm.patchValue(user);
  }

  setFieldsDisabled() {
    if (this.isView) {
      this.detailForm.get('user_name')?.disable();
      this.detailForm.get('country')?.disable();
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

  onCreate() {
    const detail = this.detailForm.value;
    const data = {
      address_details: [],
      ...detail
    }
    this.create.emit(data);
  }

  onUpdate() {
    if (this.isEdit) {
      const detail = this.detailForm.value;
      const data = {
        user_id: this.user.user_id,
        address_details: this.user.address_details,
        ...detail
      };
      this.update.emit(data);
    }
  }

  openDialog() {
    this.componentDialogRef = this.dialog.open(AddressDetailPopupComponent);
    this.componentDialogRef.afterClosed().subscribe(addressDetails => {
      if (addressDetails) {
        this.user.address_details.push(addressDetails);
        this.onUpdate();
      }
    })
  }

  openPrompt() {
    this.componentPromptRef = this.dialog.open(PromptComponent);
    this.componentPromptRef.afterClosed().subscribe(isDelete => {
      if (isDelete) {
        this.onUpdate();
      }
    })
  }

  onDelete() {
    const addressDetails = this.user.address_details;
    let deleteRows: any = [];
    deleteRows = addressDetails.filter((obj1: any) => {
      return !this.selectedRow.find((obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      })
    });

    this.user.address_details = deleteRows;
    this.dataSource = this.user.address_details;
    if (this.selectedRow.length > 0) {
      this.onUpdate();
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'address-detail-popup',
  templateUrl: './address-detail-popup.component.html',
  styleUrls: ['./address-detail-popup.component.scss']
})
export class AddressDetailPopupComponent implements OnInit {

  addressDetailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddressDetailPopupComponent>) {
  }

  ngOnInit(): void {
    this.addressDetailForm = this.formBuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      tel_no: [''],
      address: ['', Validators.required],

    });
  }

  onAdd(form: any) {
    if (this.addressDetailForm.valid) {
      this.dialogRef.close(form.value);
    } else {
      this.dialogRef.close();
    }
  }
}

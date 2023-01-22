import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PromptComponent>) {
  }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(true);
  }

}

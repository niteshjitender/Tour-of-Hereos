import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box-for-hero',
  templateUrl: './dialog-box-for-hero.component.html',
  styleUrls: ['./dialog-box-for-hero.component.css']
})
export class DialogBoxForHeroComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxForHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

   onNoClick(): void {
    this.dialogRef.close();
  }
}

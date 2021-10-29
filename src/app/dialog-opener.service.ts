import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { DialogBoxForHeroComponent } from './dialog-box-for-hero/dialog-box-for-hero.component';

@Injectable({
  providedIn: 'root'
})
export class DialogOpenerService {
  result!:string ;
  constructor(public dialog: MatDialog) { }

  openDialogBox(action:string,heroName:string):Observable<string> {
    console.log("openDialogBox function called")
    var title:string;
    var buttonName: string ;
    if(action == "add"){
      title = "Add Hero" ;
      buttonName = "Create"
    }
    else {
      title = "Edit " + heroName ;
      buttonName = "Save"
    }
    const dialogRef = this.dialog.open(DialogBoxForHeroComponent, {
      width: '250px',
      data: {title:title,button:buttonName,heroName:heroName} 
    });

    // dialogRef.afterClosed().subscribe(result => {
    //     this.result = result ;
    //     console.log('result is ' + result) ;
    // });
    // console.log('at the starting of result returning')
    // return of(this.result as string);
    return dialogRef.afterClosed() ;
  }
}

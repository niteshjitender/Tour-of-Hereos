import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { DialogBoxForHeroComponent } from '../dialog-box-for-hero/dialog-box-for-hero.component'; 
import { DialogOpenerService } from '../dialog-opener.service';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { ButtonCellRendererComponent } from '../button-cell-renderer/button-cell-renderer.component';
import { EditButtonRendererComponent } from '../edit-button-renderer/edit-button-renderer.component';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []; //Storing hero array to display
  hero!: Hero; //To store the value of hero selected after click
 //To store the value of hero selected after click

 @ViewChild('agGrid') agGrid!: AgGridAngular; // To get the selected heroes

  columnDefs!: ColDef[];
  rowData!: Observable<any[]>;
  public frameworkComponents: any;
  deleteMultipleHeroFlag = true;
  // customActions = function () {
  //   return '<button (click)="deleteByrow()">Delete Seleced Heroes</button>';
  //   };
  constructor(private heroService: HeroService, // Hero service for api communications
              private dialogService: DialogOpenerService, // Service that have methods to open dialogs
              private location: Location, //To go back at previous link
              private route: ActivatedRoute, // To get the url through route
    ) { 
        this.columnDefs = [
          {
            headerName: '#',
            maxWidth: 100,
            valueGetter: "node.rowIndex + 1",
          },
          {field:'id'},
          {field:'name',sortable:true,checkboxSelection: true},
          // {headerName: 'Actions',
          // cellRenderer: this.customActions}
          {
            headerName: 'Delete Hero',
            field: ' ',
            cellRenderer: 'buttonCellRendererComponent',
            // colId: 'params',
          },
          {
            headerName: 'Edit Hero',
            field: ' ',
            cellRenderer: 'editButtonRendererComponent',
            // colId: 'params',
          }

          
        ] ;
        this.rowData = this.heroService.getHeroes() ;
        this.frameworkComponents = {
          buttonCellRendererComponent: ButtonCellRendererComponent,
          editButtonRendererComponent: EditButtonRendererComponent
        };
      }

  ngOnInit() {
    this.getHeroes();
    this.getHero() ;
  }

  getHeroes(): void {
    console.log("Calling get heroes")
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
      console.log("Call succesful, received heros is: " + JSON.stringify(heroes)) ;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.refreshData() ;
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  
  addHero(action:string,heroName:string){
    this.dialogService.openDialogBox(action,heroName).subscribe((result) => { 
      if(result == null){
        console.log('No changes has been made');
      }
      else{
        this.add(result) ;
        console.log('Hero is added successfully');
      }
    }) ;
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if(!isNaN(id)) {
      this.heroService.getHero(id)
      .subscribe((hero) => {
        this.hero = hero;
        this.dialogService.openDialogBox('Edit',this.hero.name).subscribe((result) =>{
          if(result != null){
            this.hero.name = result;
            this.save();
          }
          else{
            this.goBack() ;
          }
        })
      });
    }
  }

  // To go back at the previous route 
  goBack(): void {
    console.log('Go back called')
    this.location.back();
  }

  save(): void {
    console.log('Hero update request called')
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  refreshData() {
    this.rowData = this.heroService.getHeroes() ;
  }

  deleteHeroes() {
    var count:number ;
    this.getSelectedRows().subscribe((data) => {
      count = data.length;
      data.forEach(id => {
        console.log("deleting hero with id: " + id) ;
        this.heroService.deleteHero(id).subscribe( () => {
          count --;
          console.log("Inside the loop " + count + " iteration remaining") ;
          if(count == 0){
            console.log("Exiting loop & refreshing rowData");
            this.refreshData() ;
            this.deleteMultipleHeroFlag = true ;
          }
        });
      });
    })
  }

  
  getSelectedRows(): Observable<number[]> {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    // const selectedDataStringPresentation = selectedData.map(node => `${node.id} ${node.name}`).join(', ');
    const selectedDataStringPresentation:any = selectedData.map(node => node.id) ;
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    console.log("Selected IDs for deletion: " + selectedDataStringPresentation) ;
    return of(selectedDataStringPresentation);
  }

  changeDeleteMultipleHeroFlag() {
    if(this.agGrid.api.getSelectedNodes().length > 0){
      this.deleteMultipleHeroFlag = false ;
    }
    else{
      this.deleteMultipleHeroFlag = true ;
    }
    console.log("Delete Multiple Heroes isDisabled: " + this.deleteMultipleHeroFlag) ;
  }

}
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { HeroService } from '../hero.service';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss']
})
export class ButtonCellRendererComponent implements AgRendererComponent, OnInit {

  public params: any;
  
  constructor(private heroService : HeroService,
              private heroComponent: HeroesComponent, 
    ) { }
  agInit(params: any): void {
    this.params = params;
  }
  
  refresh(params: ICellRendererParams): boolean {
    return true;
  }


  ngOnInit(): void {
  }

  deleteColumn(){
    // console.log(`Row: ${this.params.node.rowIndex}, Col: 
    // ${this.params.colDef.headerName}`)
    const hero = this.params.node.data ;
    console.log(hero.id) ;
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.heroComponent.refreshData() ;
      this.heroComponent.deleteMultipleHeroFlag = true ;
    });

  }
}


import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Hero } from '../hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrls: ['./edit-button-renderer.component.scss']
})
export class EditButtonRendererComponent implements AgRendererComponent, OnInit {

  public params: any;
  hero!:Hero ;
  constructor( 
    private router: Router
    ) { }
  agInit(params: any): void {
    this.params = params;
    this.hero = this.params.node.data ;
  }
  
  refresh(params: ICellRendererParams): boolean {
    return true;
  }


  ngOnInit(): void {
  }

  editHero() {
      this.router.navigate([ `/detail/${this.hero.id}` ])
  }
}

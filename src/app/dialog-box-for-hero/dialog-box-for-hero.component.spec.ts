import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxForHeroComponent } from './dialog-box-for-hero.component';

describe('DialogBoxForHeroComponent', () => {
  let component: DialogBoxForHeroComponent;
  let fixture: ComponentFixture<DialogBoxForHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxForHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxForHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

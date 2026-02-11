import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDexComponent } from './poke-dex.component';

describe('PokeDexComponent', () => {
  let component: PokeDexComponent;
  let fixture: ComponentFixture<PokeDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeDexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

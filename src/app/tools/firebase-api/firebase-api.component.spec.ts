import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseApiComponent } from './firebase-api.component';

describe('FirebaseApiComponent', () => {
  let component: FirebaseApiComponent;
  let fixture: ComponentFixture<FirebaseApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

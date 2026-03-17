import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newtag } from './newtag';

describe('Newtag', () => {
  let component: Newtag;
  let fixture: ComponentFixture<Newtag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newtag],
    }).compileComponents();

    fixture = TestBed.createComponent(Newtag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

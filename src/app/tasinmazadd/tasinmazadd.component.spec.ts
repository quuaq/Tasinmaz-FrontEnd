import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasinmazaddComponent } from './tasinmazadd.component';

describe('TasinmazaddComponent', () => {
  let component: TasinmazaddComponent;
  let fixture: ComponentFixture<TasinmazaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasinmazaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasinmazaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

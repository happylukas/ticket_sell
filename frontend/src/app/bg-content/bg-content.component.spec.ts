import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgContentComponent } from './bg-content.component';

describe('BgContentComponent', () => {
  let component: BgContentComponent;
  let fixture: ComponentFixture<BgContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

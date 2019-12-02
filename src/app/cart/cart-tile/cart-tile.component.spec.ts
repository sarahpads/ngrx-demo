import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTileComponent } from './cart-tile.component';

describe('CartTileComponent', () => {
  let component: CartTileComponent;
  let fixture: ComponentFixture<CartTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

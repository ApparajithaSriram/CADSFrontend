import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSubCategoriesComponent } from './attribute-sub-categories.component';

describe('AttributeSubCategoriesComponent', () => {
  let component: AttributeSubCategoriesComponent;
  let fixture: ComponentFixture<AttributeSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeSubCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

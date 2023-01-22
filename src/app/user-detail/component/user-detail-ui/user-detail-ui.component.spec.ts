import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailUiComponent } from './user-detail-ui.component';

describe('UserDetailUiComponent', () => {
  let component: UserDetailUiComponent;
  let fixture: ComponentFixture<UserDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

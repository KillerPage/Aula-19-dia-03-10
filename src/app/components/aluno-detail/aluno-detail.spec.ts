import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoDetail } from './aluno-detail';

describe('AlunoDetail', () => {
  let component: AlunoDetail;
  let fixture: ComponentFixture<AlunoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

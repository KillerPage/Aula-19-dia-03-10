import { Component } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './aluno-form.html',
  styleUrl: './aluno-form.scss'
})
export class AlunoForm implements OnInit{
 aluno: Aluno = {
    nome: '',
    email: '',
    curso: '',
    matricula: ''
  };

  editando = false;
  carregando = false;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.carregarAluno(Number(id));
    }
  }

  carregarAluno(id: number) {
    this.carregando = true;
    this.alunoService.getAluno(id).subscribe({
      next: (aluno) => {
        this.aluno = aluno;
        this.carregando = false;
      },
      error: (erro) => {
        alert('Erro ao carregar aluno: ' + erro.message);
        this.router.navigate(['/alunos']);
      }
    });
  }

  salvar() {
    this.carregando = true;

    if (this.editando) {
      this.alunoService.updateAluno(this.aluno.id!, this.aluno).subscribe({
        next: () => {
          this.carregando = false;
          alert('Aluno atualizado com sucesso!');
          this.router.navigate(['/alunos']);
        },
        error: (erro) => {
          this.carregando = false;
          alert('Erro ao atualizar: ' + erro.message);
        }
      });
    } else {
      this.alunoService.createAluno(this.aluno).subscribe({
        next: () => {
          this.carregando = false;
          alert('Aluno cadastrado com sucesso!');
          this.router.navigate(['/alunos']);
        },
        error: (erro) => {
          this.carregando = false;
          alert('Erro ao cadastrar: ' + erro.message);
        }
      });
    }
  }
}


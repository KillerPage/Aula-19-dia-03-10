import { Component } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-aluno-list',
  imports: [],
  templateUrl: './aluno-list.html',
  styleUrl: './aluno-list.scss'
})
export class AlunoList {
   alunos: Aluno[] = [];
  carregando = false;
  erro = '';

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.carregando = true;
    this.alunoService.getAlunos().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
        this.carregando = false;
      },
      error: (erro) => {
        this.erro = 'Erro ao carregar alunorr: ' + erro.message;
        this.carregando = false;
      }
    });
  }

  excluirAluno(id: number) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      this.alunoService.deleteAluno(id).subscribe({
        next: () => {
          this.alunos = this.alunos.filter(a => a.id !== id);
          alert('Aluno excluído com sucesso!');
        },
        error: (erro) => {
          alert('Erro ao excluir aluno: ' + erro.message);
        }
      });
    }
  }






}

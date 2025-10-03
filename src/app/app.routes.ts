import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { AlunoDetail } from './components/aluno-detail/aluno-detail';
import { authGuard } from './guards/auth-guard';
import { AlunoList } from './components/aluno-list/aluno-list';
import { Dashboard } from './components/dashboard/dashboard';
import { AlunoForm } from './components/aluno-form/aluno-form';


export const routes: Routes = [ { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'alunos',
    component: AlunoList,
    canActivate: [authGuard]
  },
  {
    path: 'alunos/novo',
    component: AlunoForm,
    canActivate: [authGuard] // PROTEGER com Guard
  },
  {
    path: 'alunos/editar/:id',
    component: AlunoForm,
    canActivate: [authGuard] // PROTEGER com Guard
  },
  {
    path: 'alunos/:id',
    component: AlunoDetail,
    canActivate: [authGuard] // PROTEGER com Guard
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];



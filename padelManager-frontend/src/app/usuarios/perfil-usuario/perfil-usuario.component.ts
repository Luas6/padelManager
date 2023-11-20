import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent{
  usuario?: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('idSesion');
    if (userIdString !== null) {
      const userId = +userIdString;
    if (userId) {
      this.usuarioService.getUsuarioById(userId)
        .subscribe(usuario => this.usuario = usuario);
    }
  }

}

}
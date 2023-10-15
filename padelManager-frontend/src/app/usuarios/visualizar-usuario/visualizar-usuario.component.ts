import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent {
  id!: number;
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.usuarioService.getUsuarioById(this.id).subscribe(data => {
      this.usuario = data;
    }, error => console.log("Error al cargar el usuario"+ error));
  }
}

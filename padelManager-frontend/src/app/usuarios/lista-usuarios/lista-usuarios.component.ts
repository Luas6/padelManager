import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  usuarios!: Usuario[];

constructor(
  private usuariosService: UsuarioService,
  private router: Router
  ){}

private getUsuarios(){
  this.usuariosService.getListaUsuarios().subscribe(data =>{
    this.usuarios = data;
  });
}

actualizarUsuario(id:number){
  this.router.navigate(['actualizar-usuario',id])
}

eliminarUsuario(id:number){
  this.usuariosService.borrarUsuario(id).subscribe(data =>{
    this.getUsuarios();
  });
}

visualizarUsuario(id:number){
  this.router.navigate(['visualizar-usuario',id])
}

ngOnInit(): void{
this.getUsuarios();

}
}

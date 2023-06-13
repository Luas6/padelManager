import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }
  saveUsuario(){
    this.usuarioService.crearUsuario(this.usuario).subscribe( data =>{
      console.log(data);
      this.goToUsuarioList();
    },
    error => console.log(error));
  }

  goToUsuarioList(){
    this.router.navigate(['/usuarios']);
  }
  
  onSubmit(){
    console.log(this.usuario);
    this.saveUsuario();
  }
}

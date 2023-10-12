import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent {
  
  actualizarUsuarioForm: FormGroup;

  mensajeError: string = '';
  id!: number;
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) {
      this.actualizarUsuarioForm = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      });
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.usuarioService.getUsuarioById(this.id).subscribe(data => {
      this.usuario = data;
    }, error => console.log(error));
  }
  onSubmit(){
    if(this.actualizarUsuarioForm.valid){
      this.actualizarUsuario();
    }else{
      this.mensajeError = 'Usuario o Contraseña no válidos';
    }
  }

  actualizarUsuario(){
    this.usuarioService.actualizarUsuario(this.id, this.actualizarUsuarioForm.value).subscribe( data =>{
      this.goToUsuarioList();
    }
    , error => console.log(error));
  }

  goToUsuarioList(){
    this.router.navigate(['/usuarios']);
  }

}

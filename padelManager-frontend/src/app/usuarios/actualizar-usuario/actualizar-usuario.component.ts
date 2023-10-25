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
      this.mensajeError = 'Revisa los campos del formulario';
    }
  }

  actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.id, this.actualizarUsuarioForm.value).subscribe(
      (data) => {
        this.goToUsuarioList();
      },
      (error: any) => {
       if (error.status === 404) {
          this.mensajeError = 'Usuario no encontrado';
        } else if (error.status === 409) {
          this.mensajeError = 'Correo ya en uso';
        } else if (error.status === 400) {
          this.mensajeError = 'Revisa los campos obligatorios y que todo tenga el formato correcto';
        } else {
          this.mensajeError = 'Error al hacer login. Inténtalo de nuevo más tarde';
        }
      }
    );
  }

  goToUsuarioList(){
    this.router.navigate(['/usuarios']);
  }

}

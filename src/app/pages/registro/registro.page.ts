import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup,Validators } from '@angular/forms';
import { IonicModule,AlertController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,RouterLink]
})
export class RegistroPage {
  registro: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private fb: FormBuilder , private router: Router, private alertCtrl: AlertController) {
    this.registro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Mínimo 6 caracteres, una mayúscula, una minúscula, un número y un símbolo
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{6,}$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
  if (this.passwordType === 'password') {
    this.passwordType = 'text';
    this.passwordIcon = 'eye';
  } else {
    this.passwordType = 'password';
    this.passwordIcon = 'eye-off';
  }
}

  async onSubmit() {
  if (this.registro.valid) {
    let { email, password, confirmPassword } = this.registro.value;

    // 🔹 Convertir correo a minúsculas
    email = email.toLowerCase();

    if (password !== confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioExistente = usuarios.find((u: any) => u.email === email);

    if (usuarioExistente) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El correo ya está registrado',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const nuevoUsuario = { email, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Registro exitoso',
      buttons: ['OK']
    });
    await alert.present();

    this.registro.reset();
    this.router.navigate(['/inicio-sesion']);
  } else {
    const alert = await this.alertCtrl.create({
      header: 'Formulario inválido',
      message: 'Por favor, complete todos los campos correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }
  }
  ngOnInit() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      console.log('Usuarios registrados:', usuarios);
  }

}



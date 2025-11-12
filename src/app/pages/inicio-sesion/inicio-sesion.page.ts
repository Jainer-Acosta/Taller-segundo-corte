import { Pattern } from './../../../../node_modules/@types/estree/index.d';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,ReactiveFormsModule,RouterLink]
})
export class InicioSesionPage {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  inicioSesion: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, private alertCtrl: AlertController, private router: Router
   ) {
    this.inicioSesion = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

  
   async onSubmit(){
    if(this.inicioSesion.valid){
      let { email, password } = this.inicioSesion.value;

      email = email.toLowerCase();

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find((u: any) => u.email === email && u.password === password);

       if (usuario) {
        
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Inicio de sesión exitoso',
          buttons: ['OK']
        });
        await alert.present();
        this.inicioSesion.reset();
      } else {
        
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos',
          buttons: ['OK']
        });
        await alert.present();
      }
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

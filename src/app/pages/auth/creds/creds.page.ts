import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
         IonLabel, IonGrid, IonRow, IonCol, IonInput, IonText, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creds',
  templateUrl: './creds.page.html',
  styleUrls: ['./creds.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem,
             IonLabel, IonGrid, IonRow, IonCol, IonInput, IonText, IonInputPasswordToggle, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CredsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController,
    private fromBuilder: FormBuilder) 
  {
    this.loginForm = this.fromBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
        });
  }

  loginForm: FormGroup;

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      
      // this.authService.validateUserCredentials(username, password);

      this.authService.validateUserCredentials(username, password)
      .subscribe(response => {
        if(response === username) {
          this.navCtrl.navigateRoot('/home');
        } else {
          this.presentToast('Login failed. Please try again.');
        }
      });
      

      // if(this.authService.isAuthenticated()) {
      //   this.navCtrl.navigateRoot('/home');
      // } else {
      //   this.presentToast('Login failed. Please try again.');
      // }
      
    }
  }

  cancel() {
    this.navCtrl.navigateRoot('/login');
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

}

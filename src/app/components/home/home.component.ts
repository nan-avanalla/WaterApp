import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
          IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, 
            IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
            IonButton, IonIcon, IonText],
})
export class HomeComponent  implements OnInit {
  public screenTitle!: string;

  constructor(private router: Router) { 
    addIcons({ notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp })
  }

  ngOnInit() {
    this.screenTitle = 'Home';
  }

  navigate(path: string) {
    switch(path) {
      case "alarm": this.router.navigate(['/alarm']);
                break;
      case "database": this.router.navigate(['/database']);
                break;
      case "display": this.router.navigate(['/display']);
                break;
      default: this.router.navigate(['/home']);
                break;
    }
  }

}

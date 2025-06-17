
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonImg, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp, logOutOutline, logOutSharp } from 'ionicons/icons';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, NgIf, IonApp, IonSplitPane, IonMenu, IonContent, IonImg, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonFooter],
})
export class AppComponent {
  public appPages = [
    { title: 'Alarms', url: '/folder/Alarms', icon: 'notifications' },
    { title: 'Database', url: '/folder/Database', icon: 'server' },
    { title: 'Displays', url: '/folder/Displays', icon: 'desktop' }
  ];
  constructor(
    private authService: AuthService,
    private storage: Storage,
    private navCtrl: NavController) {
    this.storage.create();
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp, logOutOutline, logOutSharp });
  }

  displayMenu = true;
  public loggedInUser = "Admin";

  async ngOnInit() {
    // alert('app component')
    // await this.storage.create();
    // this.displayMenu = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logOutUser(this.loggedInUser);
    this.displayMenu = false;
    this.navCtrl.navigateRoot('/home');
  }
}

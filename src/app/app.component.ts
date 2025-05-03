
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp, logOutOutline, logOutSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonFooter],
})
export class AppComponent {
  public appPages = [
    { title: 'Alarms', url: '/folder/Alarms', icon: 'notifications' },
    { title: 'Database', url: '/folder/Database', icon: 'server' },
    { title: 'Displays', url: '/folder/Displays', icon: 'desktop' }
  ];
  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, notificationsOutline, notificationsSharp, serverOutline, serverSharp, desktopOutline, desktopSharp, homeOutline, homeSharp, logOutOutline, logOutSharp });
  }
}

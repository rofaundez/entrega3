import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentOutline, homeOutline, pawOutline, pencilOutline, peopleOutline, qrCodeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonFooter,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonIcon
  ]
})
export class FooterComponent {
  selectedButton = 'welcome';  // Aseguramos que el valor por defecto sea 'welcome'
  isScanning = false;
  @Output() footerClick = new EventEmitter<string>();

  constructor() { 
    addIcons({ homeOutline, qrCodeOutline, pawOutline, pencilOutline, peopleOutline, documentOutline });
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }
}

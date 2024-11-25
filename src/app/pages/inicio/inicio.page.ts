import { Component, ViewChild } from '@angular/core';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { Dinosaur } from 'src/app/model/dinosaur';
import { Capacitor } from '@capacitor/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { MisDatosPage } from "../mis-datos/mis-datos.page";

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonContent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    QrWebScannerComponent,
    DinosaurComponent,
    ForumComponent,
    MisDatosPage
]
})
export class InicioPage {
  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  
  constructor(private auth: AuthService, private scanner: ScannerService) { }

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {
    if (button === 'testqr') {
      this.showDinoComponent(Dinosaur.jsonDinoExample);
    }
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showDinoComponent(qr: string) {
    if (Dinosaur.isValidDinosaurQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('dinosaur');
      return;
    }
    this.changeComponent('welcome');
  }

  async footerClick(button: string) {
    this.selectedComponent = button;  // Cambiar el componente activo

    if (button === 'qrwebscanner') {
      // Detectamos la plataforma y ejecutamos el escaneo de QR correspondiente
      if (Capacitor.getPlatform() === 'web') {
        this.selectedComponent = 'qrwebscanner';  // Mostramos el escáner de QR para la web
      } else {
        // En dispositivos móviles, procedemos con el escaneo QR nativo
        this.showDinoComponent(await this.scanner.scan());
      }
    } else {
      // Aquí puedes agregar el manejo de otros botones, como 'forum', 'misdatos', etc.
      this.selectedComponent = button;
    }
  }
  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;  // Sincroniza el estado del footer
  }
}

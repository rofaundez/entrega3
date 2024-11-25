import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
import { colorWandOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [
    CommonModule // CGV-Permite usar directivas comunes de Angular
    ,
    FormsModule // CGV-Permite usar formularios
    ,
    IonicModule // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    ,
    TranslateModule // CGV-Permite usar pipe 'translate'
    ,
    LanguageComponent // CGV-Lista de idiomas
    ,
    FooterComponent
]
})
export class ingresoPage implements ViewWillEnter {

  /** 
   * CGV-INI-Traducciones
   * Para poder utilizar la traducción de textos, se debe:
   *   1. Ejecutar: npm i @ngx-translate/core 
   *   2. Ejecutar: npm i @ngx-translate/http-loader
   *   3. Crear carpeta: src/app/assets/i18n
   *   4. Crear archivo: src/app/assets/i18n/es.json para los textos en español
   *   5. Crear archivo: src/app/assets/i18n/en.json para los textos en inglés
   * 
   * CGV-FIN-Traducciones
  */ 

  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  user: string;
  password: string;


  constructor(
      private router: Router
    , private translate: TranslateService
    , private authService: AuthService) 
  { 
    this.user = 'atorres';
    this.password = '1234';
    // Los iconos deben ser agregados a uno (ver en https://ionic.io/ionicons)
    addIcons({ colorWandOutline }); 
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  login() {
    this.authService.login(this.user, this.password);
  }

  registerNewUser() {

  }

  passwordRecovery() {
    
  }
  navigateToMap() {
    this.router.navigate(['/map']);
  }
  navigateToCorreo() {
    this.router.navigate(['/correo']);
  }
}

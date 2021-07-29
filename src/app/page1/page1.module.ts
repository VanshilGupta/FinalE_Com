import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import {FooterComponent} from '../footer/footer.component';

import { Page1PageRoutingModule } from './page1-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { Page1Page } from './page1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page1PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Page1Page]
})
export class Page1PageModule {}

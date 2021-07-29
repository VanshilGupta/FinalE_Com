import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WomenPageRoutingModule } from './women-routing.module';

import { WomenPage } from './women.page';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {MatSelectModule} from '@angular/material/select';
import { HomepagePageModule } from '../homepage/homepage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WomenPageRoutingModule,
    MatSelectModule,
    HomepagePageModule
  ],
  declarations: [WomenPage, DropdownComponent]
})
export class WomenPageModule {}

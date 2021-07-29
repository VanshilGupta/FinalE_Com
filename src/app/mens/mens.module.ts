import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensPageRoutingModule } from './mens-routing.module';
import { MensPage } from './mens.page';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';


import { DropdownComponent } from '../dropdown/dropdown.component';
import {MatSelectModule} from '@angular/material/select';
import { HomepagePage } from '../homepage/homepage.page';
import { HomepagePageModule } from '../homepage/homepage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensPageRoutingModule,
    MatSelectModule,
    HomepagePageModule
  ],
  declarations: [MensPage, DropdownComponent]
})
export class MensPageModule {}

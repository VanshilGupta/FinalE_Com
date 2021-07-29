import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import { HomepagePageModule } from '../homepage/homepage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    HomepagePageModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}

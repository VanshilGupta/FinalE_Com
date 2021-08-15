import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';


import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { BuyComponent } from '../buy/buy.component';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  declarations: [HomepagePage,NavbarComponent,FooterComponent,BuyComponent],
  entryComponents : [NavbarComponent,FooterComponent,BuyComponent],
  exports : [NavbarComponent,FooterComponent,BuyComponent]

})
export class HomepagePageModule {}

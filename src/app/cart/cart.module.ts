import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogClose, MatDialogModule} from '@angular/material/dialog'
import { HomepagePageModule } from '../homepage/homepage.module';
import { BuyComponent } from '../buy/buy.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    MatTooltipModule,
    HomepagePageModule,
    MatButtonModule,
  ],
  declarations: [CartPage],

})
export class CartPageModule {}

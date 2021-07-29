import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';

import { ProductPage } from './product.page';
import { FooterComponent } from '../footer/footer.component';
import { HomepagePageModule } from '../homepage/homepage.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    HomepagePageModule
  ],
  declarations: [ProductPage],
})
export class ProductPageModule {}

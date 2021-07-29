import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'

@Component({
  selector: 'app-weboffers',
  templateUrl: './weboffers.page.html',
  styleUrls: ['./weboffers.page.scss'],
})
export class WeboffersPage implements OnInit {
  message:any
  topStories1: any;
  topStories2: any;
  topStories3: any;
  topStories4: any;
  slideOpts1 = {
    
    speed: 200,
    loop: true,
    autoplay: {
      delay: 4000,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts2 = {
    
    speed: 200,
    loop: true,
    autoplay: {
      delay: 6000,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts3 = {
    
    speed: 200,
    loop: true,
    autoplay: {
      delay: 3500,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts4 = {
    
    speed: 200,
    loop: true,
    autoplay: {
      delay: 5000,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOptsreverse = {
    initialSlide: 4,
    speed: 400,
    loop: true,
    autoplay: {
          delay: 4000,
          reverseDirection: true
    }
  };
  constructor(private http:HttpClient) {
    this.topStories1 = [
      {picture: "https://images.bewakoof.com/uploads/grid/app/b1g1-hero-banner-men-1626697275.jpg"},
      {picture: "https://images.bewakoof.com/uploads/grid/app/bazaar-hero-banner-men-1626189046.jpg"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h2b/hc6/17115217821726/CK-JEANS----WEB-.jpg"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/h0a/hd3/17115217494046/ALLEN-SOLLY----WEB-.jpg"}
    ]
    this.topStories2 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/a6de806a-b58b-460b-97fd-d78d80eab39b1596641021693-Women-s-Ethnic-Wear_Anouk.jpg"},
      {picture: "https://images.bewakoof.com/uploads/grid/app/FriendshipDay-Bewakoof-Homepage-HeroBanner-men-1626445135.jpg"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/cec595c6-c7ec-4259-af8b-997a33a09ce71598892377444-Puma.jpg"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/9e4fb95e-6268-49c5-9ed1-e6b1bd4b5efd1595935030880-Content-ethnicwear-trend-fashionmeetcomfort.jpg"}
    ]
    this.topStories3 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/8becef46-f822-4874-b92a-a7cc7f58819d1597841103131-Content-sportswear-brand-nike.png"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h59/he1/17115217035294/rare-%26-sera----WEB-.jpg"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/8d5afb84-a464-40af-9971-2e9f0827e9b71598892377591-UCB.jpg"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/8f070770-db34-4e20-ab80-59728106460a1598892519078-GAP.jpg"}
    ]
    this.topStories4 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/774f42c4-f459-4514-9b90-cf8a60a5f68c1596644478087-hrx30.jpg"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/8363b55c-446f-4de2-bc5b-e75fd6fdfb2d1597840217862-Content-accessories-brand-fastrack.png"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/efc4b19d-179f-4437-961c-839df50299a51604906586690-36-Essentials-Night_innerwear.jpg"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/5e68d729-b955-431c-930c-931d8b452d421597840217983-Content-accessories-color-white.png"}
    ]

  } 

  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

  ngOnInit(){
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#FF7F00' , '#FFFF00' , '#00FF00' , '#0000FF' , '#4B0082']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 6],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'black',
      textFontSize: '16'
    }))
  }
  reset() {
    this.wheel.reset()
  }
  // before() {
  //   alert('Your wheel is about to spin')
  // }
  getValue ;
  value ;
  async spin() {
    
    // var valueList = ["100","110","40","80","10","120","30","70"];
    // var getValue = valueList[Math.floor(Math.random() * valueList.length)];
    
    this.getValue = this.seed[Math.floor(Math.random() * this.seed.length)];
     this.idToLandOn = this.getValue;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  after() {
    var valueList = ["5","10","8","1","40","3","15","13","24","9","21","17"];
    this.message="Hurray!! you got discount of";
    this.value = valueList[this.getValue]
    alert(this.message+" "+this.value+"/-")
  }
}

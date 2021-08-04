import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})

export class HomepagePage implements OnInit {
  womenswear=[];
  topStories: any;
  topStories1: any;
  topStories2: any;
  topStories3: any;
  topStories4: any;
  topStories5: any;
  topStories6: any;
  topStories7: any;
  topStories8: any;
  

  slideOpts = {
    
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3500,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
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
  slideOpts5 = {
    
    speed: 300,
    loop: true,
    autoplay: {
      delay: 3800,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts6 = {
    
    speed: 360,
    loop: true,
    autoplay: {
      delay: 4200,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts7 = {
    
    speed: 250,
    loop: true,
    autoplay: {
      delay: 3600,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  slideOpts8 = {
    
    speed: 450,
    loop: true,
    autoplay: {
      delay: 3400,
      
    },
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  constructor(private http:HttpClient) { 
    this.http.get('http://127.0.0.1:8000/ecomapp/home').subscribe((result:any)=>{
      this.womenswear=result.wears;
      console.log(this.womenswear);

    })
    this.topStories = [
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h5f/hc6/17112096571422/Indian-Terrain-Static-Web.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h73/h96/17120607207454/watches_web.jpg","link":"/watches"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h1e/h0e/16535186997278/WFH-Main-Web.jpg","link":"/men"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/h87/h0e/17112093229086/20thjuly_web.jpg","link":"/weboffers"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/hf9/h44/17120606945310/denims_web.jpg","link":"/men"}
    ]
    this.topStories1 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/085719b1-c71e-4f47-950c-9a6b7f291fac1598348260370-Jack-_-Jones.jpg","link":"/men"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/83d9ca97-4aa3-46ce-bd28-b135d3b94a021595935030673-Content-ethnicwear-essentials-everydaykurtas.jpg","link":"/men"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/b85eb6be-0223-4cca-bc81-56ca3089daf11597841355970-Content-westernwear-Essentials-Women-s-Trousers--copy--.jpg","link":"/men"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/4aa58fe6-8c61-4e37-9fa8-436c31aecb211597840566511-Content-sportswear-essentials-activewear.png","link":"/men"}
      
    ]
    this.topStories2 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/a6de806a-b58b-460b-97fd-d78d80eab39b1596641021693-Women-s-Ethnic-Wear_Anouk.jpg","link":"/women"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/046ab589-87d5-4afa-8ab3-10e06fdbe6a61598348260596-W.jpg","link":"/women"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/cec595c6-c7ec-4259-af8b-997a33a09ce71598892377444-Puma.jpg","link":"/men"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/9e4fb95e-6268-49c5-9ed1-e6b1bd4b5efd1595935030880-Content-ethnicwear-trend-fashionmeetcomfort.jpg","link":"/women"}
    ]
    this.topStories3 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/8becef46-f822-4874-b92a-a7cc7f58819d1597841103131-Content-sportswear-brand-nike.png","link":"/men"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/bddd9c73-e4f1-43c0-a073-2ff3c0e376b51595934830554-Content-Accesories-men-Sporty-Watches_.jpg","link":"/watches"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/8d5afb84-a464-40af-9971-2e9f0827e9b71598892377591-UCB.jpg","link":"/men"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/8f070770-db34-4e20-ab80-59728106460a1598892519078-GAP.jpg","link":"/men"}
    ]
    this.topStories4 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/774f42c4-f459-4514-9b90-cf8a60a5f68c1596644478087-hrx30.jpg","link":"/men"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/8363b55c-446f-4de2-bc5b-e75fd6fdfb2d1597840217862-Content-accessories-brand-fastrack.png","link":"/watches"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/11/9/efc4b19d-179f-4437-961c-839df50299a51604906586690-36-Essentials-Night_innerwear.jpg","link":"/men"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/5e68d729-b955-431c-930c-931d8b452d421597840217983-Content-accessories-color-white.png","link":"/watches"}
    ]
    this.topStories5 = [
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h41/h9f/17101690535966/FLYING%20MACHINE-----WEB-20210721.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/hcf/hac/17101690929182/KILLER-----WEB-20210721.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h71/h98/17101690339358/DUKE-----WEB-20210721.jpg","link":"/men"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/hc0/ha6/17101690798110/NUMEROUNO-----WEB-20210721.jpg","link":"/men"}
      
    ]
    this.topStories6 = [
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/ha0/h7b/16870855016478/MK--WEB---top-brands-20210609.jpg","link":"/women"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h44/hf7/16870856589342/Forever-New-----web.jpg","link":"/women"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h0e/h59/16821349220382/Casio-WEB---top-brands-2.jpg","link":"/watches"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/h29/h4b/17101678477342/COLOR-PLUS-----416-by-312-WEB.jpg","link":"/men"}
      
    ]
    this.topStories7 = [
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/085719b1-c71e-4f47-950c-9a6b7f291fac1598348260370-Jack-_-Jones.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h28/h6a/17150852464670/LEVIS-----WEB.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h3c/h77/17152454787102/Sport----WEB-20210208.jpg","link":"/watches"},
      { picture: "https://sslimages.shoppersstop.com/sys-master/root/h4c/h7a/17152454852638/T-Touch-WEB-20210208.jpg","link":"/watches"}
      
    ]
    this.topStories8 = [
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h87/hf0/16870856392734/Fab-alley-----web.jpg","link":"/women"},
      {picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/28/83d9ca97-4aa3-46ce-bd28-b135d3b94a021595935030673-Content-ethnicwear-essentials-everydaykurtas.jpg","link":"/men"},
      {picture: "https://sslimages.shoppersstop.com/sys-master/root/h7a/he0/17126057082910/Mimosa--web.jpg","link":"/women"},
      { picture: "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/19/4aa58fe6-8c61-4e37-9fa8-436c31aecb211597840566511-Content-sportswear-essentials-activewear.png","link":"/men"}
      
    ]
  }

  ngOnInit() {
  }

}

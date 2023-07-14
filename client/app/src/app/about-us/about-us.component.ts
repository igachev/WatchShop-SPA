import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
images = [
  {name:'shop.jpg' ,caption:'Welcome To WatchShop!The perfect place to buy your next watch!' },
  {name:'highQuality.jpg' ,caption: 'Variety of high quality watches.'},
  {name:'prices.jpg' ,caption:'We offer the most affordable prices.' },
  {name:'logistics.jpg' ,caption:'We will send your purchases regardless of where you are located.' },
  {name:'customerService.jpg' ,caption:'We provide excellent customer service.' },
  {name:'repairService.jpg' ,caption:'We offer repair services to watches purchased from us.' }
]
}

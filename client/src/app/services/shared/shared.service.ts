import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  images = [{
    img: 'http://static1.1.sqspcdn.com/static/p/1119256/12759993/1326025262863/pano+slice+900+x+300+100ppi-26.jpg?asGalleryImage=true&token=3cGsJaSjOwV0qJtPiwUC9txlR38%3D',
    alt: 'Sunset'
  }, {
    img: 'https://owips.com/sites/default/files/clipart/night-sky-clipart/261956/night-sky-clipart-night-skyline-261956-4949532.jpg',
    alt: 'City'
  }, {
    img: 'https://www.delosguide.com/wp-content/uploads/2017/04/delostour1024-900x300.jpg',
    alt: 'Statues'
  }, {
    img: 'https://travelfree.info/wp-content/uploads/2017/02/los-angeles-1-900x300.jpg',
    alt: 'Skyscraper'
  }, {
    img: 'https://travelfree.info/wp-content/uploads/2018/04/Los-Angeles-Depositphotos_39527807-700x300.jpg',
    alt: 'Los Angeles',
  }, {
    img: 'https://travelfree.info/wp-content/uploads/2016/01/los-angeles-800x300.jpg',
    alt: 'Hollywood Sign'
  }, {
    img: 'http://www.worldtour360.com/360/Lithuania/img/GarrisonChurch20130818_large.jpg',
    alt: 'Lithuania'
  }, {
    img: 'https://www.nationsonline.org/gallery/USA/Jacksonville-Florida-Skyline.jpg',
    alt: 'Jacksonville Florida Skyline',
  }, {
    img: 'http://botster.ai/wp-content/uploads/2018/07/jacob-kiesow-342238-unsplash-900x300.jpg',
    alt: 'Purple Smoke'
  }]

  parseHTML(post, className, i) {
    let elm = document.querySelector(`.${className}-${i}`);
    elm.innerHTML = `${post.body.slice(0, (post.body.length > 300 ? 300 : post.body.length - 4))}...`;
  }

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

  goBack() {
    window.history.back();
  }

  normalizeRoute(title) {
    return title.toLowerCase().split(' ').join('-');
  }

  generateImg() {
    return this.images[Math.floor((Math.random() * 8))];
  }

}

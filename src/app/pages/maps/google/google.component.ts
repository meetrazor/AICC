import { Component, OnInit, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})

/**
 * Google map component - handling the google map with sidebar and content
 */
export class GoogleComponent implements OnInit {

  longitude = 20.728218;
  latitude = 52.128973;
  markers: any;

  // tslint:disable-next-line: max-line-length
  lightStyle = [{ featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] }, { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 18 }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 16 }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 21 }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dedede' }, { lightness: 21 }] }, { elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }] }, { elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }] }, { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }, { lightness: 19 }] }, { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#fefefe' }, { lightness: 20 }] }, { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }] }];
  // tslint:disable-next-line: max-line-length
  darkStyle = [{ featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'on' }] }, { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#000000' }, { lightness: 40 }] }, { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#000000' }, { lightness: 16 }] }, { featureType: 'all', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#000000' }, { lightness: 20 }] }, { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }] }, { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#e5c163' }] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#c4c4c4' }] }, { featureType: 'administrative.neighborhood', elementType: 'labels.text.fill', stylers: [{ color: '#e5c163' }] }, { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 20 }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 21 }, { visibility: 'on' }] }, { featureType: 'poi.business', elementType: 'geometry', stylers: [{ visibility: 'on' }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#e5c163' }, { lightness: '0' }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ visibility: 'off' }] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#e5c163' }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 18 }] }, { featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{ color: '#575757' }] }, { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.arterial', elementType: 'labels.text.stroke', stylers: [{ color: '#2c2c2c' }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 16 }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#999999' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 19 }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }, { lightness: 17 }] }];

  @ViewChild('streetviewMap', { static: true }) streetviewMap: any;
  @ViewChild('streetviewPano', { static: true }) streetviewPano: any;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Maps', path: '/' }, { label: 'Google Maps', path: '/', active: true }];

    this._initPanorama();

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * street view map
   */
  _initPanorama() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const center = { lat: 42.345573, lng: -71.098326 };
        // tslint:disable-next-line: no-string-literal
        const map = new window['google'].maps.Map(this.streetviewMap.nativeElement, { center, zoom: 12, scrollwheel: false });
        // tslint:disable-next-line: no-string-literal
        const panorama = new window['google'].maps.StreetViewPanorama(
          this.streetviewPano.nativeElement, {
            position: center,
            pov: { heading: 34, pitch: 10 },
            scrollwheel: false
          });
        map.setStreetView(panorama);
      });
    }
  }

  /**
   *
   * @param position position where marker added
   */
  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;

    this.markers.push({ latitude: lat, longitude: lng });
  }

  /**
   * Fetches the value of map
   */
  private _fetchData() {
    this.markers = [
      { latitude: 52.228973, longitude: 20.728218 }
    ];
  }

}

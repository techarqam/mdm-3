import { Injectable } from '@angular/core';
import { ConnectivityService } from '../../Connectivity/connectivity.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google: any
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  MarkerIcon,
  HtmlInfoWindow,
} from '@ionic-native/google-maps';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyBsvOMTDzjB6WILW5dKLRtcsTGCuMmJFBs";

  constructor(
    public connectivityService: ConnectivityService,
    public geolocation: Geolocation
  ) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }



  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {
        console.log(position);

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        let options: MarkerOptions = {
          title: 'Hello World',
          snippet: '@ionic-native/google-maps',
          position: latLng,
          infoWindowAnchor: [16, 0],
          anchor: [16, 32],
          draggable: true,
          flat: false,
          rotation: 32,
          visible: true,
          styles: {
            'text-align': 'center',
            'font-style': 'italic',
            'font-weight': 'bold',
            'color': 'red'
          },
          // animation: GoogleMapsAnimation.DROP,
          zIndex: 0,
          disableAutoPan: true
        };

        // this.map.addMarker(options).then((marker: Marker) => {

        // })

        // this.map.addMarker({
        //   title: "My Location",
        //   snippet: "subTit",
        //   position: latLng,
        // })

        resolve(true);

      });

    });

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }
}

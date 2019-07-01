import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { GoogleMapsService } from 'src/app/Services/Location/maps/GoogleMaps/google-maps.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CommonService } from 'src/app/Services/Common/common.service';
declare var google: any

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.component.html',
  styleUrls: ['./set-location.component.scss'],
})
export class SetLocationComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public maps: GoogleMapsService,
    public platform: Platform,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public commonService: CommonService,
  ) {
    this.searchDisabled = true;
    this.saveDisabled = true;
  }

  ngOnInit(): void {

    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

    });

  }

  selectPlace(place) {

    this.places = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {

      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

        this.maps.map.setCenter({ lat: location.lat, lng: location.lng });

        this.location = location;

      });

    });

  }

  searchPlace(query) {

    this.saveDisabled = true;

    if (query.length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }

      });

    } else {
      this.places = [];
    }

  }

  save() {
    this.modalCtrl.dismiss(this.location);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}

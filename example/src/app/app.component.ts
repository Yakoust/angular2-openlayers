import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  DrawInteractionComponent,
  MapComponent,
  DefaultInteractionComponent,
  SourceVectorComponent,
  LayerVectorComponent,
  DragAndDropInteractionComponent
} from 'angular2-openlayers';
import { ModifyInteractionComponent } from '../components/modify.component';
import { Feature, style, interaction, events, geom, layer, Collection, source, format, ProjectionLike, control } from 'openlayers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public zoom = 15;
  public opacity = 1.0;
  public width = 5;
  private isCreateMode = false;
  private isSelectMode = false;
  private isTranslateMode = false;
  private isEditMode = false;
  private features: Collection<Feature> = new Collection<Feature>();
  private type: geom.GeometryType = 'Circle';
  private dragDropConstructors = [
    ((): format.GPX => new format.GPX()),
    ((): format.GeoJSON => new format.GeoJSON()),
    ((): format.IGC => new format.IGC()),
    ((): format.KML => new format.KML()),
    ((): format.TopoJSON => new format.TopoJSON())
  ];
  @ViewChild('dragAndDropInteraction') dragAndDropInteraction: DragAndDropInteractionComponent;

  @ViewChild('map') map: MapComponent;
  @ViewChild('sourceVector') sourceVector: SourceVectorComponent;

  @ViewChild('layer') layer: LayerVectorComponent;
  private defaultStyle = {
    'Point': new style.Style({
      image: new style.Circle({
        fill: new style.Fill({
          color: 'rgba(255,255,0,0.5)'
        }),
        radius: 5,
        stroke: new style.Stroke({
          color: '#ff0',
          width: 1
        })
      })
    }),
    'LineString': new style.Style({
      stroke: new style.Stroke({
        color: '#f00',
        width: 3
      })
    }),
    'Polygon': new style.Style({
      fill: new style.Fill({
        color: 'rgba(0,255,255,0.5)'
      }),
      stroke: new style.Stroke({
        color: '#0ff',
        width: 1
      })
    }),
    'MultiPoint': new style.Style({
      image: new style.Circle({
        fill: new style.Fill({
          color: 'rgba(255,0,255,0.5)'
        }),
        radius: 5,
        stroke: new style.Stroke({
          color: '#f0f',
          width: 1
        })
      })
    }),
    'MultiLineString': new style.Style({
      stroke: new style.Stroke({
        color: '#0f0',
        width: 3
      })
    }),
    'MultiPolygon': new style.Style({
      fill: new style.Fill({
        color: 'rgba(0,0,255,0.5)'
      }),
      stroke: new style.Stroke({
        color: '#00f',
        width: 1
      })
    })
  };

  ngAfterViewInit(): void {
    // this.dragAndDropInteraction.instance.on('addfeatures', (event: interaction.DragAndDrop.Event) => this.addLayer(event));
    // (<layer.Vector> this.layer.instance).setStyle((feature, resolution) => this.buildStyle(feature, resolution))

  }

  buildStyle(feature, resolution) {
    const featureStyleFunction = feature.getStyleFunction();
    if (featureStyleFunction) {
      return featureStyleFunction.call(feature, resolution);
    } else {
      return this.defaultStyle[feature.getGeometry().getType()];
    }
  }

  addLayer(event: interaction.DragAndDrop.Event) {
    event.features.forEach(f => this.features.push(f));
    this.map.instance.getView().fit(this.sourceVector.instance.getExtent());
  }

  endCreateMode() {
    this.isCreateMode = false;
  }
  setCreateMode() {
    this.isCreateMode = true;
  }

  setSelectMode() {
    this.isSelectMode = true;
  }

  setTranslateMode() {
    this.isTranslateMode = true;
  }

  endTranslateMode() {
    this.isTranslateMode = false;
  }

  setEditMode() {

    this.isEditMode = true;
  }
  endEditMode() {
    this.isEditMode = false;
  }

  unsetSelectMode() {
    this.isSelectMode = false;
  }

  increaseZoom() {
    this.zoom = Math.min(this.zoom + 1, 18);
    console.log('zoom: ', this.zoom);
  }

  decreaseZoom() {
    this.zoom = Math.max(this.zoom - 1, 1);
    console.log('zoom: ', this.zoom);
  }

  increaseOpacity() {
    this.opacity = Math.min(this.opacity + 0.1, 1);
    console.log('opacity: ', this.opacity);
  }

  decreaseOpacity() {
    this.opacity = Math.max(this.opacity - 0.1, 0);
    console.log('opacity: ', this.opacity);
  }
}

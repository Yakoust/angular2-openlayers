import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interaction, EventsConditionType, layer, style, Collection, SelectFilterFunction, StyleFunction, Feature } from 'openlayers';
import { MapComponent } from 'angular2-openlayers';

@Component({
    selector: 'aol-interaction-translate',
    template: ''
})
export class TranslateInteractionComponent implements OnInit, OnDestroy {
    instance: interaction.Translate;


    @Input() features?: Collection<Feature>;
    @Input() layers?: (layer.Layer[] | ((layer: layer.Layer) => boolean));

    constructor(private map: MapComponent) {
    }

    ngOnInit() {
        this.instance = new interaction.Translate(this);
        this.map.instance.addInteraction(this.instance);
    }

    ngOnDestroy() {
        this.map.instance.removeInteraction(this.instance);
    }
}

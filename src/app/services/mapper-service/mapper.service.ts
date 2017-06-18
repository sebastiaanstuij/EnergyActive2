import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class MapperService {

  constructor() { }

  transformdata(data): MappedData {
    let consumptionData = data.consumptionData.ms;
    let windData = data.windData.ms;

    // Sort and map one array with objects belonging to a certain type of 'origin'
    let mappedDataWind = _.chain(windData)
      .map(function (item) {
        return { origin: 'wind-energy', value: +item.v, date: new Date(item.ts) };
      })
      .sortBy(function (item) {
        return item.date;
      })
      .value();

    let mappedDataConsumption = _.chain(consumptionData)
      .map(function (item) {
        let modifiedItem = item.v >= 0 ? item.v : 0;
        return { origin: 'energy-consumption', value: +modifiedItem, date: new Date(item.ts) };
      })
      .sortBy(function (item) {
        return item.date;
      })
      .value();

    let mappedDataSunOverSupply = _.chain(consumptionData)
      .map(function (item) {
        let modifiedItem = item.v >= 0 ? 0 : Math.abs(item.v);
        return { origin: 'sun-energy', value: +modifiedItem, date: new Date(item.ts) };
      })
      .sortBy(function (item) {
        return item.date;
      })
      .value();

    let greenEnergy = _.chain(mappedDataWind)
      .map(function (itemWind, i) {
        let correspondingSunEnergyItemValue = mappedDataSunOverSupply[i].value;
        return {
          origin: 'green-energy',
          value: +itemWind.value + correspondingSunEnergyItemValue,
          date: itemWind.date
        };
      })
      .sortBy(function (item) {
        return item.date;
      })
      .value();

    // then create an object of all the mapped data and return this to the calling function
    let mappedData = new MappedData();

    mappedData.wind_energy = mappedDataWind;
    mappedData.green_energy = greenEnergy;
    mappedData.sun_energy = mappedDataSunOverSupply;
    mappedData.energy_consumption = mappedDataConsumption;

    return mappedData;
  }
}

export class MappedData {
    wind_energy: any;
    green_energy: any;
    sun_energy: any;
    energy_consumption: any;
};

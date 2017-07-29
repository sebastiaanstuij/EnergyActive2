import {Injectable} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {demandData} from '../../../assets/data/json/demand-data';
import {windData} from '../../../assets/data/json/wind-data';
import {ResponseOptions, Response, RequestMethod} from "@angular/http";


@Injectable()
export class MockBackendService {

    constructor(private backend: MockBackend) {}

    generateRandomGreenScore(): Number {
        // console.log('random called');
        return Math.floor((Math.random() * (5 - 0) + 1));
    }

    start(): void {
        this.backend.connections.subscribe((c: MockConnection) => {
            const URL = "EnergyData";
 
            switch (c.request.url) {
                case 'EnergyData':
                    switch (c.request.method) {
                        case RequestMethod.Get:
                            console.log('Succesful Mock EnergyData Get request');
                            let greenscore = this.generateRandomGreenScore();                
                            c.mockRespond(new Response(new ResponseOptions({
                                body: {
                                    consumptionData: demandData,
                                    windData: windData,
                                    greenscore: JSON.parse(JSON.stringify(greenscore))
                                },
                                status: 200
                            })));
                            break;
                        case RequestMethod.Post:
                            console.log('(Mock) Post not yet implemented');
                            c.mockRespond(new Response(new ResponseOptions({
                                status: 201
                            })));
                            break;
                        case RequestMethod.Delete:
                            console.log('(Mock) Delete not yet implemented');
                            c.mockRespond(new Response(new ResponseOptions({
                                status: 201
                            })));
                            break;
                    }
            }

        });
    }

}

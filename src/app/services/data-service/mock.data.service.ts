import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { HttpModule, Headers } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { demandData } from '../../../assets/data/json/demand-data';
import { windData } from '../../../assets/data/json/wind-data';



@Injectable()
export class MockXHRBackend {

    constructor() {
    }

    generateRandomGreenScore(): Number {
        console.log('random called');
        return Math.floor((Math.random() * (5 - 0) + 1));
    }

    createConnection(request: Request): Object {
        let response = new Observable((responseObserver: Observer<Response>) => {
            let responseOptions;

            switch (request.url) {
                case 'greenscore':
                    console.log('greenscore');
                    switch (request.method) {
                        case RequestMethod.Get:
                            console.log('Succesful Greenscore Mock Get request');
                            let greenscore = this.generateRandomGreenScore();
                            responseOptions = new ResponseOptions({
                                body: { greenscore: JSON.parse(JSON.stringify(greenscore)) },
                                status: 200
                            });
                            break;
                        case RequestMethod.Post:
                            console.log('(Mock) Greenscore Post not yet implemented');
                            responseOptions = new ResponseOptions({ status: 201 });
                            break;
                        case RequestMethod.Delete:
                            console.log('(Mock) Greenscore Delete not yet implemented');
                            responseOptions = new ResponseOptions({ status: 200 });
                    }
                    break;
                case 'overviewData':
                    console.log('overviewData');
                    switch (request.method) {
                        case RequestMethod.Get:
                            console.log('Succesful OverviewData Mock Get request');
                            responseOptions = new ResponseOptions({
                                body: {
                                    overviewData: {
                                        consumptionData: demandData,
                                        windData: windData
                                        }
                                    },
                                status: 200
                            });

                            break;
                        case RequestMethod.Post:
                            console.log('(Mock) OverviewData Post not yet implemented');
                            responseOptions = new ResponseOptions({ status: 201 });
                            break;
                        case RequestMethod.Delete:
                            console.log('(Mock) OverviewData Delete not yet implemented');
                            responseOptions = new ResponseOptions({ status: 200 });
                    }
            }

            let responseObject = new Response(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { };
        });
        return { response };
    }

}

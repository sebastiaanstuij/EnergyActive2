import { Request, ReadyState, Response, ResponseOptions, RequestMethod, XSRFStrategy, BrowserXhr, ConnectionBackend, Connection} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { HttpModule, Headers } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { demandData } from '../../../assets/data/json/demand-data';
import { windData } from '../../../assets/data/json/wind-data';



@Injectable()
export class MockXHRBackend implements ConnectionBackend {

    constructor(private _browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {}

    generateRandomGreenScore(): Number {
        console.log('random called');
        return Math.floor((Math.random() * (5 - 0) + 1));
    }

    createConnection(request: Request): Connection {
        let response = new Observable((responseObserver: Observer<Response>) => {
            let responseOptions;                
              switch (request.url) {
                case 'EnergyData':
                    switch (request.method) {
                        case RequestMethod.Get:
                            console.log('Succesful Mock EnergyData Get request');
                            let greenscore = this.generateRandomGreenScore();
                            responseOptions = new ResponseOptions({
                                body: {
                                    consumptionData: demandData,
                                    windData: windData,
                                    greenscore: JSON.parse(JSON.stringify(greenscore))
                                },
                                status: 200
                            });

                            break;
                        case RequestMethod.Post:
                            console.log('(Mock) Post not yet implemented');
                            responseOptions = new ResponseOptions({ status: 201 });
                            break;
                        case RequestMethod.Delete:
                            console.log('(Mock) Delete not yet implemented');
                            responseOptions = new ResponseOptions({ status: 200 });
                    }

                    let responseObject = new Response(responseOptions);
                    responseObserver.next(responseObject);
                    responseObserver.complete();
                    return () => { };
                }

        });

        let connection = {
            request: request,
            response: response,
            readyState: ReadyState.Done,

        }

        return connection;
    }

}

import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {

    constructor() {}

    generateRandomGreenScore(): Number {
        console.log('random called');
        return Math.floor((Math.random() * (5 - 0) + 1));
    }

    createConnection(request: Request): Object {
        let response = new Observable((responseObserver: Observer<Response>) => {
            let responseOptions;
            switch (request.method) {
                case RequestMethod.Get:
                    console.log('Succesful Mock Get request');
                    let greenscore = this.generateRandomGreenScore();
                    responseOptions = new ResponseOptions({
                        body: { greenscore: JSON.parse(JSON.stringify(greenscore)) },
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
        });
        return { response };
    }
}

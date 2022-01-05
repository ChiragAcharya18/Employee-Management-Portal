import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {HttpInterceptorSpinner} from "./http-inteceptor";

export const httpIntecptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorSpinner,
        multi: true
    }
];
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router'; 
import { SessionService } from '../shared/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  public p: Observable<any>;
  i = 0;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private loaderService: LoaderService, public router: Router
    , private session: SessionService) {
      console.log(this.session.token);
    }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    //
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    //
    this.loaderService.isLoading.next(true);
    //
    const o = new Observable(observer => {
      const reqAddedToken = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.session.token}`,
        }
        // this.headers = new HttpHeaders({
        //   'Content-Type': 'application/json',
        //   'Authorization': 'Bearer ' + this.accessToken
        // });
      });
      const s = next.handle(reqAddedToken).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              // this.toast.toastError(err.status); // , err.statusText); 
              console.log(err.status, err.statusText);
              // this.session.doSignOut();
              // this.router.navigate(['auth/login']);
            } else {
              console.log(err.error);
   
              // this.snackBar.openSnackBar(`${err.status} : ${err.error.Description}`);
            }
          }
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        s.unsubscribe();
      };
    });
    //
    return o as Observable<HttpEvent<any>>;
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}

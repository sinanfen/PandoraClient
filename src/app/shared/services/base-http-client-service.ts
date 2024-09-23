import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BaseHttpClientService {
  private baseUrl: string = "https://localhost:7114";

  constructor(private http: HttpClient) {}

  protected get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${url}`)
      .pipe(catchError(this.handleError));
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

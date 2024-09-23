import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClientService } from "./base-http-client-service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpClientService {
  // Constructor is automatically injected with HttpClient through the base class

  login(usernameOrEmail: string, password: string): Observable<any> {
    const loginPayload = {
      usernameOrEmail,
      password,
    };

    return this.post<any>("api/Auth/Login", loginPayload);
  }
}

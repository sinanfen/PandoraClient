import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/services/auth-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ["", [Validators.required]], // Validate for required field
      password: ["", [Validators.required, Validators.minLength(6)]], // Password should be at least 6 characters
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { usernameOrEmail, password } = this.loginForm.value;

      this.authService.login(usernameOrEmail, password).subscribe(
        (response) => {
          console.log("Login successful", response);
          localStorage.setItem("token", response.token); // Store the JWT token in localStorage
          this.router.navigate(["/dashboard"]); // Redirect to the dashboard
        },
        (error) => {
          console.error("Login failed", error);
          this.errorMessage = "Invalid login credentials. Please try again.";
        }
      );
    }
  }
}

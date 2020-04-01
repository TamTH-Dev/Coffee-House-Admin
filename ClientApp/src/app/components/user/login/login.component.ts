import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserAccount } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { BootController } from 'src/boot-controller';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  userAccount: UserAccount;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.resetForm();
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
    this.userAccount = {
      userName: null,
      password: null
    }
  }

  onSubmit(form: NgForm): void {
    this.userService.login(form.value).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
        this.router.navigateByUrl('/home');
      },
      error: err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect UserName or Password', 'Authentication failed');
        } else {
          console.log(err);
        }
      }
    })
  }

}

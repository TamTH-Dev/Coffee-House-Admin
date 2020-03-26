import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { UserAccount } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('home');
      return;
    }
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
      next: (res: any) => {
        localStorage.setItem('token', res.token);
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

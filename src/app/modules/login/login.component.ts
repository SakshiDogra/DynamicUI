import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    roles = [
        { code: 'admin', value: 'Adminstrator' },
        { code: 'user', value: 'user' },
    ];
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userDataService: UserDataService
    ) { }

    ngOnInit() {
        this.buildFormControls();
    }

    buildFormControls() {
        this.loginForm = this.formBuilder.group({
            userName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            role: new FormControl('')
        });
    }

    onChange(role) {
        this.loginForm.get('role').setValue(role);
    }

    login() {
        this.userDataService.getMetaDataList();
        this.userDataService.getMetaDataList();
        const role = this.loginForm.get('role');
        if (role.value === 'admin') {
            this.router.navigate(['view-list']);
        } else {
            this.router.navigate(['user-list']);
        }
    }

    disable() {
        const role = this.loginForm.get('role');
        return (this.loginForm.valid && role.value);
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  isNew = true;
  isView = false;
  isEdit = false;
  user_id: any;
  isUpdate = false;

  constructor(private route: ActivatedRoute, private router: Router, public userService: UserService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      this.user_id = params.get('id');
      if (type === 'create') {
        this.isNew = true;
        this.isView = false;
        this.isEdit = false;
      }
      if (type === 'view') {
        this.isNew = false;
        this.isView = true;
        this.isEdit = false;
      }
      if (type === 'edit') {
        this.isNew = false;
        this.isView = false;
        this.isEdit = true;
      }
    });
  }

  create(input: any) {
    this.userService.createUser({...input}).subscribe(({status, message, data}) => {
      if (status === 'OK') {
        alert(message);
        this.router.navigate(['/user'])
      }

    })
  }

  update(input: any) {
    this.userService.updateUser({...input}).subscribe(({status, message, data}) => {
      if (status === 'OK') {
        alert(message);
        this.userService.updateState(true);
      }

    })
  }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user.service";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users = [];
  USERS_DATA = []
  page = 0;
  pageSize = 5;
  count = 0;
  length = 0
  usersListTableInformation: PageEvent = {
    pageSize: 10,
    pageIndex: 0,
    length: 0
  }

  paginationInfo = {
    page: 0,
    perPage: 10,
  }

  usersListTableSort: Sort = {
    active: 'user_name',
    direction: 'asc'
  }

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const column = this.usersListTableSort.active;
    const sortingInfo = {
      [column]: this.usersListTableSort.direction == 'desc' ? 'descending' : 'ascending'
    }
    const params = {...this.paginationInfo, ...sortingInfo};
    this.userService.getUsers(params).subscribe(({status, data, meta}) => {
      if (status == 'OK') {
        this.users = data;
        this.USERS_DATA = data;
        this.count = meta.total;
        this.usersListTableInformation = {
          pageSize: meta.perPage,
          pageIndex: meta.page,
          length: meta.length
        }
      }
    })
  }

  usersListTable(val: PageEvent) {
    this.paginationInfo = {
      page: val.pageIndex,
      perPage: val.pageSize
    }
    this.getUsers();
  }

  usersPageSizeChanged(val: number) {
    // console.log('usersPageSizeChanged', val)
  }

  onUsersListTableSort(val: Sort) {
    this.usersListTableSort = {
      active: val.active,
      direction: val.direction
    }
    this.getUsers();
  }

  onFilter(searchStr: any) {
    const users = [...this.USERS_DATA];
    const name = searchStr.name.toLowerCase();
    const country = searchStr.country.toLowerCase();
    const searchValue = users.filter((user) => {
      const strName = String(user['user_name']).toLowerCase().match(name);
      const strCountry = String(user['country']).toLowerCase().match(country);
      if ((strName && strName[0] !== '') || (strCountry && strCountry[0] !== '')) {
        return user;
      }
      return undefined;
    });
    if (searchValue.length > 0 || (name !== '' || country !== '')) {
      this.users = searchValue;
    } else {
      this.users = this.USERS_DATA;
    }
  }

  onDelete(users: any) {
    if (confirm('DELETE USER API IS NOT WORKING!!!!')) {
      this.userService.deleteUser(users).subscribe((res) => {
        alert(res.message)
      })
    }
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SideMenu } from '../models/sideMenu';
import { SidebarService } from '../services/sidebar.service';
import { isEmpty } from 'lodash';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cancerList: string[] = [];
  selectedCancer: string = '';
  cancerTypeForm : any;
  sideMenuItems: SideMenu[] = [];
  listActiveClass = 'list-group-item list-group-item-action list-group-item-success';
  listInactiveClass = 'list-group-item';
  @Output() selectedCategory = new EventEmitter<any>();
  dateSlider = {
    minValue : 2012,
    maxValue : 2014,
    options: {
      floor: 2010,
      ceil: 2020
    }
  }

  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.cancerList = ['Breast Cancer', 'Lung Cancer']
    this.cancerTypeForm = this.formBuilder.group({
      cancerTypes : [null],
    });
  }

  onSelect(){
    const cancerType = this.cancerTypeForm.controls.cancerTypes.value
    this.sideBarService.getCancerAttributes(cancerType).subscribe(
      (result) => {
        if (!isEmpty(result)) {
          this.sideMenuItems = this.convertToSideMenuModel(result);
          this.router.navigate(['/cancer/categories']);
        }
        else {
          this.sideMenuItems = [];
          this.router.navigate(['/']);
        }
      },
      (error) => console.error(error)
    );
  }

  convertToSideMenuModel(cancerAttributes: string[]): SideMenu[] {
    const sideMenuItems: SideMenu[] = []
    cancerAttributes.forEach(
      (attribute) => sideMenuItems.push (this.generateSideMenuItem(attribute))
    );
    return sideMenuItems;
  }

  private generateSideMenuItem(attribute: string) {
    const sideMenu = new SideMenu();
    sideMenu.name = attribute;
    sideMenu.active = false;
    sideMenu.textDecorator = this.listInactiveClass;
    return sideMenu
  }

  onClickSideMenu(menuItem: SideMenu){
    this.sideMenuItems.forEach(item => {item.active = false; item.textDecorator = 'list-group-item'});
    const currentMenuItem = this.sideMenuItems.find(item => item === menuItem);
    if (currentMenuItem) {
      currentMenuItem.active = true;
      currentMenuItem.textDecorator = this.listActiveClass;
      localStorage.setItem('selectedCategory', JSON.stringify(currentMenuItem))
    }
  }

  dateSliderValueChange(value: any){
    localStorage.setItem('dateRange', JSON.stringify(this.dateSlider));
  }

}

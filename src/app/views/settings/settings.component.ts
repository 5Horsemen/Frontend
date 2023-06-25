import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  formGroup: FormGroup;
  iconName: string;
  darkModeIcon: string;


  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      notifications: false,
      darkMode: false
    });
    this.iconName = 'notifications_off';
    this.darkModeIcon = 'brightness_5';
  }



  toggleIcon() {
    const notificationsControl = this.formGroup.get('notifications');
    if (notificationsControl && notificationsControl.value) {
      this.iconName = 'notifications_none';
    } else {
      this.iconName = 'notifications_off';
    }

  }
  toggleDarkModeIcon() {
    const darkModeControl = this.formGroup.get('darkMode');
    if (darkModeControl && darkModeControl.value) {
      this.darkModeIcon = 'brightness_4';
    } else {
      this.darkModeIcon = 'brightness_5';
    }
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}

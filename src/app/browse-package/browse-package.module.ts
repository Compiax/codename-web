import { BrowsePackageService } from './browse-package.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowsePackageRoutingModule } from './browse-package-routing.module';
import { BrowsePackageComponent } from './browse-package.component';


@NgModule({
  declarations: [
      BrowsePackageComponent
  ],
  imports: [
    CommonModule,
    BrowsePackageRoutingModule
  ],
  providers: [BrowsePackageService]
})

export default class BrowsePackageModule { 

}
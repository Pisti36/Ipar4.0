import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from './page-container/page-container.component';
import { PageHeadingComponent } from './page-container/page-heading/page-heading.component';
import { PageContentComponent } from './page-container/page-content/page-content.component';
import { NavigationComponent } from './page-container/navigation/navigation.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PageContainerComponent, PageHeadingComponent, PageContentComponent, NavigationComponent],
    exports: [PageContainerComponent, PageHeadingComponent, PageContentComponent, NavigationComponent]
})
export class LayoutModule {}
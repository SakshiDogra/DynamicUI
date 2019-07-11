import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-panel-content',
  templateUrl: './panel-content.component.html',
  styleUrls: ['./panel-content.component.scss']
})
export class PanelContentComponent implements OnInit, OnDestroy {
  private componentRef: ComponentRef<{}>;
  private mappings = {
    // mappings to components
    // ex: 'custom-component': CustomComponent
  };

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @Input() component: string; // component name
  @Input() context: any;      // data that needs to be passed to dynamically injected component

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  /**
  * Component lifecycle hooks
  * @method ngOnInit
  * @return none
  */
  ngOnInit(): void {
    if (this.component) {
      const componentName = this.getComponentName(this.component);
      this.container.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentName);
      this.componentRef = this.container.createComponent(factory);
      const instance = <PanelContentComponent> this.componentRef.instance;
      instance.context = this.context;
    }
  }

  /**
  * Component lifecycle hooks
  * @method ngOnDestroy
  * @return none
  */
  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  /**
  * function to map component name to the actual component
  * @method getComponentName
  * @param component - component name
  * @return Component
  */
  getComponentName(component: string) {
    const componentName = this.mappings[component];
    return componentName;
  }
}

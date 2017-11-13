import { Component, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { ComponentOutlet } from './component-outlet.directive'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  @ViewChild(ComponentOutlet, { read: ViewContainerRef })
  container: ViewContainerRef

  url: string = ''
  loadedUrl: string = 'about:blank'
  hasContent: boolean = false
  scriptHost = document.querySelector('#dynamic-script-host')

  load(url: string): void {
    const segments = url.split('/')
    const name = segments[segments.length - 1].replace('.js', '')

    while (this.scriptHost.firstChild) {
      this.scriptHost.removeChild(this.scriptHost.firstChild)
    }
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.defer = true
    script.onload = () => {
      const cmpFactory = window.ngDemos[name]
      this.container.createComponent(cmpFactory)
      this.hasContent = true
      this.loadedUrl = url
    }
    script.onerror = (error) => {
      alert(error)
    }
    this.scriptHost.appendChild(script)
  }

  clear(): void {
    this.container.clear()
    this.hasContent = false
    this.loadedUrl = 'about:blank'
  }
}

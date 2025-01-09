import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSource = new BehaviorSubject<any[]>([]);
  breadcrumb$ = this.breadcrumbSource.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Listen for route changes to update breadcrumbs
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs(this.activatedRoute.root);
    });
  }

  // Helper function to generate breadcrumb labels dynamically based on the route
  private getBreadcrumbLabel(routeUrl: string[], routeParams: any): string {
    if (routeUrl.includes('list-folders')) {
      return 'List Folders';
    } else if (routeUrl.includes('folder-preview')) {
      return `Folder Preview - ${routeParams['name'] || 'No Folder'}`;
    } else if (routeUrl.includes('form-preview')) {
      return `Form Preview - ${routeParams['id'] || 'No Form'}`;
    }
    return 'Unknown';
  }

  // Recursive method to update breadcrumbs based on the current route and its children
  updateBreadcrumbs(route: ActivatedRoute, path: string[] = []): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      const routeParams = route.snapshot.paramMap;
      const breadcrumbItems = path.map(segment => ({
        label: this.getBreadcrumbLabel(path, routeParams),
        routerLink: '/' + path.join('/')
      }));

      this.breadcrumbSource.next(breadcrumbItems);
      return;
    }

    for (const child of children) {
      const routeURL: string[] = path.concat(child.snapshot.url.map(segment => segment.path));
      this.updateBreadcrumbs(child, routeURL);
    }
  }
}

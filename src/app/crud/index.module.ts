import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudComponent } from './crud.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [{
    path: "",
    component: CrudComponent,
    children: [
        // {path: "",loadChildren: './list-employee/index.module#ListEmployeeModule'},
        { 
            path: '',
            loadChildren: () => import('./list-employee/index.module').then(x => x.ListEmployeeModule)
        },
        // {path: "create",loadChildren: './add-employee/index.module#AddEmployeeModule'},
        { 
            path: 'create',
            loadChildren: () => import('./add-employee/index.module').then(x => x.AddEmployeeModule)
        },
        // {path: "edit/:id",loadChildren: './edit-employee/index.module#EditEmployeeModule'},
        { 
            path: 'edit/:id',
            loadChildren: () => import('./edit-employee/index.module').then(x => x.EditEmployeeModule)
        }
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule
    ],
    declarations: [
        // CrudComponent
    ]
})
export class CrudModule { }
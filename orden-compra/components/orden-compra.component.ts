import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdenCompraService } from '../services/orden-compra.service';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss'],
})
export class OrdenCompraComponent implements OnInit {
  ordenescompra: any[] = [];
  headers: Array<string> = ['Id', 'Proveedor', 'Precio', 'Estado'];

  constructor(
    private readonly ordencompraService: OrdenCompraService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.ordencompraService
      .getAll()
      .pipe(
        tap((ordenescompra) => {
          this.ordenescompra = ordenescompra.map((oc) => {
            return {
              Id: oc.id,
              Proveedor: oc.proveedor.nombre,
              Precio: oc.precio,
              Estado: oc.estado,
            };
          });
          console.log(ordenescompra);

          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
}

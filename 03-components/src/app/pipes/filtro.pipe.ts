import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(data: any[], 
            texto: string = '',
            colum: string = 'title'
            ): any[] {
    
    if (texto == '' || !data) {
      return data;
    }

    texto = texto.toLocaleLowerCase();

    return data.filter( item => item[colum].toLowerCase().includes(texto) );
  }

}

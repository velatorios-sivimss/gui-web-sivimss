import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Platform} from "@angular/cdk/platform";
import {catchError, switchMap} from "rxjs/operators";

@Injectable()
export class DescargaArchivosService {

  constructor() {
  }

  descargarPDF(pdf$: Observable<Blob>) {
    const options = {
      suggestedName: 'documento.pdf',
      types: [
        {
          description: 'PDF',
          accept: {
            'application/pdf': ['.pdf'],
          },
        },
      ],
    };

    return pdf$.pipe(
      switchMap((pdfBlob: Blob) => {
        return window.showSaveFilePicker(options).then((fileHandle: FileSystemFileHandle) => {
          return fileHandle.createWritable().then((writable: FileSystemWritableFileStream) => {
            writable.write(pdfBlob);
            writable.close();
            console.log('Archivo guardado correctamente.');
            return true;
          });
        });
      }),
      catchError((error) => {
        console.error('Error al guardar el archivo:', error);
        return of(false);
      })
    );
  }
}

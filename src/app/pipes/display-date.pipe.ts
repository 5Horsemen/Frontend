import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'displayDate' })
export class DisplayDatePipe implements PipeTransform {
    transform(value: Date): string {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Asegurarse de que las fechas se están comparando en la misma zona horaria
        const inputDate = new Date(value);
        const localInputDate = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate());

        if (localInputDate.getDate() === today.getDate() &&
            localInputDate.getMonth() === today.getMonth() &&
            localInputDate.getFullYear() === today.getFullYear()) {
            return 'Hoy';
        } else if (
            localInputDate.getDate() === yesterday.getDate() &&
            localInputDate.getMonth() === yesterday.getMonth() &&
            localInputDate.getFullYear() === yesterday.getFullYear()
        ) {
            return 'Ayer';
        } else {
            return localInputDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        }
    }
}

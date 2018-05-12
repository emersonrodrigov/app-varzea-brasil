import { NgControl } from '@angular/forms';
export declare class Ionic2MaskDirective {
    private control;
    mask: string;
    constructor(control: NgControl);
    ngOnChanges(): void;
    onKeyUp($event: any): void;
    private format(v);
}

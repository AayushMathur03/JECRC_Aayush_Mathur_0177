import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new Highlight(elementRefMock);
    expect(directive).toBeTruthy();
  });
});

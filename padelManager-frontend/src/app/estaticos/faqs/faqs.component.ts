import { Component } from '@angular/core';
import { Faq } from './faqs-interface';
import { FAQS } from './entradas-faqs';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  faqs: Faq[] = FAQS;
}

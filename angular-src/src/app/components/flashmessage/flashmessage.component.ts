import { Component,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flashmessage',
  templateUrl: './flashmessage.component.html',
  styleUrls: ['./flashmessage.component.scss']
})

export class FlashmessageComponent {
  @Input() message: string | undefined;
  showMessage: boolean;
  @Input() backgroundcolor:string;
  constructor() {
    this.showMessage = false;
    this.backgroundcolor ='#058405';
    //this.message = ''
   }

   ngOnChanges(changes: SimpleChanges) {
      console.log(changes['message'].currentValue);
      if(changes['message'].currentValue != changes['message'].previousValue)
      {
        this.manageMessage(changes['message'].currentValue);
      }
}

manageMessage(message: string) {
    if (message && message.length > 0) {
        this.message = message;
        this.showMessage = true;

        setTimeout(() => {
            this.showMessage = false;
            this.message = undefined;
        }, 3000);
    }
}
}

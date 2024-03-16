import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

export default class CreateRecordLDS extends LightningElement {
    accountPhone;
    accountName;
    accountWeb;

    nameHandler(event){
      this.accountName=event.target.value;
    }

    phoneHandler(event){
      this.accountPhone=event.target.value;
    }
    webHandler(event){
      this.accountWeb=event.target.value;
    }
    createAccount(){
       const fields={'Name':this.accountName,'Phone':this.accountPhone,'Website':this.accountWeb};
       const recordInput={apiName:'Account',fields};

       createRecord(recordInput).then(Response=>{eval("$A.get('e.force:refreshView').fire()");}).catch(error=>{console.log('error');})
    

    }    
    

}
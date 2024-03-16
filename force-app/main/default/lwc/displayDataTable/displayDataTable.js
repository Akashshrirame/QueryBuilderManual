import { api,wire, LightningElement } from 'lwc';
import getRecordInfo from "@salesforce/apex/ExecuteSOQL.getRecordInfo";
export default class DisplayDataTable extends LightningElement {
@api soqlQuery;
  originalArrayData = [];
  data = [];
  columns = [];

  connectedCallback() {
    getRecordInfo({ soqlQuery: this.soqlQuery })
      .then(response => {
        this.originalArrayData = response;
        this.data = Array.from(this.originalArrayData);
        this.columns = this.constructDatatableColumn(this.data);  
      })
      .catch(err => { console.log(err) })
  }

  constructDatatableColumn(historyArray) {
    let columnArray = [];
    const actions = [
      { label: 'Preview', name: 'preview' }
    ];
    const arrayObj = historyArray[0];
    for (const key in arrayObj) {
      if (Object.prototype.hasOwnProperty.call(arrayObj, key)) {
        const objElement = { label: key, fieldName: key };
        columnArray.push(objElement);
      }
    }
    const rowDropdown = {
      type: 'action',
      typeAttributes: { rowActions: actions },
    }
    columnArray.push(rowDropdown);
    return columnArray;
  }

  getSelectedId(event) {
    const selectedRows = event.detail.selectedRows;
    for (let i = 0; i < selectedRows.length; i++) {
    }
  }

  backButtonHandler() {
    const backButtonEvent = new CustomEvent('backbuttonclick', { detail: false });
    this.dispatchEvent(backButtonEvent);
  }

  handleRowAction(event) {
  }
 
  exportData(){
     
       let rowEnd = '\n';
       let csvString = '';
       // this set elminates the duplicates if have any duplicate keys
       let rowData = new Set();
       // getting keys from data
       this.data.forEach(function (record) {
           Object.keys(record).forEach(function (key) {
               rowData.add(key);
           });
       });
       // Array.from() method returns an Array object from any object with a length property or an iterable object.
       rowData = Array.from(rowData);
       // splitting using ','
       csvString += rowData.join(',');
       csvString += rowEnd;
       //main for loop to get the data based on key value
        for (let i = 0; i < this.data.length; i++) {
            let colValue = 0;

            // validating keys in data
            for (let key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if (colValue > 0) {
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = this.data[i][rowKey] === undefined ? '' : this.data[i][rowKey];
                    csvString += '"' + value + '"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

         //Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Account Data.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click();
    }

    exportToWhatsapp(){
      
       let rowEnd = '\n';
       let csvString = '';
       // this set elminates the duplicates if have any duplicate keys
       let rowData = new Set();
       // getting keys from data
       this.data.forEach(function (record) {
           Object.keys(record).forEach(function (key) {
               rowData.add(key);
           });
       });
       rowData = Array.from(rowData);
       // splitting using ','
       csvString += rowData.join(',');
       csvString += rowEnd;
       //main for loop to get the data based on key value
        for (let i = 0; i < this.data.length; i++) {
            let colValue = 0;

            // validating keys in data
            for (let key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if (colValue > 0) {
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = this.data[i][rowKey] === undefined ? '' : this.data[i][rowKey];
                    csvString += '"' + value + '"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

         //Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Account Data.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click();
    }

}
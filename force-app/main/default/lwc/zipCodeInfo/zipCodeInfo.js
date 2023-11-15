import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import fetchZipCodeInfos from '@salesforce/apex/zipCodeCallout.showZipCodeDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import ModalComponent from 'c/modalComponent';


export default class ZipCodeInfo extends LightningElement {
    @track showSummaryDetail;
    @track noZipFound;
    @track country;
    @track placename;
    @track state;
    @track showSaveButton = false;
    @track newZipCodeId;

    countryOptions = [
        { label: 'Canada', value: 'CA' },
        { label: 'Mexico', value: 'MX' },
        { label: 'United States', value: 'US' },
    ];

    @track isModalOpen = false;
    @track modalData = {};

    handleModalClose() {
        // Update the isModalOpen property when the modal is closed
        this.isModalOpen = false;
    }

   /* handleResetButtonClick() {
        // Reset all values to their initial state
        this.showSummaryDetail = false;
        this.noZipFound = false;
        this.country = null;
        this.placename = null;
        this.state = null;
        this.showSaveButton = false;
        this.modalData = {};
  
        // Close the modal
        this.isModalOpen = false;
     } */

    openModal() {
        this.isModalOpen = true;
    }

   /* closeModal() {
        this.isModalOpen = false;
    } */



    handleCountryChange(event) {
        this.country = event.detail.value;
    }

    handleBtnClick() {
        let validateInput = this.template.querySelector('.zipCode');
        let validateValue = validateInput.value;
        if (!validateValue) {
            validateInput.setCustomValidity('Zipcode is required');
            this.showSummaryDetail = false;
        } else {
            validateInput.setCustomValidity('');
        }
        validateInput.reportValidity();
        if (validateValue) {
            //this.isLoaded = true;
            let zipCodeValue = this.template.querySelector('.zipCode').value;
            let countryValue = this.country;
    
            fetchZipCodeInfos({
                zipCode: zipCodeValue,
                country: countryValue,
            })
                .then(result => {
                    if (result && result.places && result.places.length > 0) {
                        let place = result.places[0];
                        this.showSummaryDetail = true; //Details
                        this.noZipFound = false;
                        this.country = result.country;
                        this.placename = place.placename;
                        this.state = place.state;
                        this.showSaveButton = this.country !== 'US';
    
                        this.modalData = {
                            country: this.country,
                            placename: this.placename,
                            state: this.state,
                        };
                    } else {
                        this.showSummaryDetail = false;
                        this.noZipFound = true;
                    }
                        this.isModalOpen = true;
                })
                .catch(error => {
                    console.error('error: ', error);
                    t//his.isLoaded = false;
                });
        }
    }
}

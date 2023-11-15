// modalComponent.js
import { LightningElement, api, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalComponent extends LightningElement {
    @api isModalOpen = false;
    @api modalData;

    closeModal() {
        this.isModalOpen = false;

        // Dispatch an event to notify the parent component (ZipCodeInfo) that the modal is closed
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleSaveButtonClick() {
        const fields = {
            Country__c: this.modalData.country,
            State__c: this.modalData.state,
            Place_Name__c: this.modalData.placename,
            Name: this.template.querySelector('.zipCode').value,
        };

        const recordInput = { apiName: 'ZipCode__c', fields };

        createRecord(recordInput)
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'NewZipCode record created successfully',
                        variant: 'success',
                    })
                );
                this.closeModal();
            })
            .catch(error => {
                console.error('Error creating NewZipCode record: ', error);
            });
    }
}


import mongoose from 'mongoose';
import { expect } from 'chai';
import Item from './baseitem-model';

mongoose.Promise = global.Promise;

describe('Base item model', () => {
    let itemData;
    beforeEach(() => {
        itemData = Object.assign(
            {},
            {
                clientId: '12345678',
                clientRequest: '5c0179dd9c55a711053087cb',
                submittedBy: '5bb69cb1322fdf5690edfc0b'
            }
        );
    });

    describe('field validations', () => {
        it('is valid when all required fields are provided', done => {
            const item = new Item(itemData);

            item.validate(err => {
                expect(err).to.not.exist;
                done();
            });
        });

        it('is invalid if the clientId field is empty', done => {
            delete itemData.clientId;
            const item = new Item(itemData);

            item.validate(err => {
                expect(err.errors['clientId']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the submittedBy field is empty', done => {
            delete itemData.submittedBy;
            const item = new Item(itemData);

            item.validate(err => {
                expect(err.errors['submittedBy']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the clientRequest field is empty', done => {
            delete itemData.clientRequest;
            const item = new Item(itemData);

            item.validate(err => {
                expect(err.errors['clientRequest']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if urgency provided is not allowed', done => {
            itemData.urgency = 'asap';
            const item = new Item(itemData);

            item.validate(err => {
                expect(err.errors['urgency']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if status provided is not allowed', done => {
            itemData.status = 'maybe';
            const item = new Item(itemData);

            item.validate(err => {
                expect(err.errors['status']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });
    });

    describe('defaults', () => {
        it("urgency to 'important'", () => {
            const item = new Item(itemData);
            expect(item.urgency).to.equal('important');
        });

        it("status to 'active'", () => {
            const item = new Item(itemData);
            expect(item.status).to.equal('active');
        });
    });
});

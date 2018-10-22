import mongoose from 'mongoose';
import { expect } from 'chai';
import HouseholdItem from './household-model';

mongoose.Promise = global.Promise;

describe('Household item model', () => {
    describe('field validations', () => {
        it('is valid when all required fields are provided', done => {
            const item = new HouseholdItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'bedding'
            });

            item.validate(err => {
                expect(err).to.not.exist;
                done();
            });
        });

        it('is invalid if the clientId field is empty', done => {
            const item = new HouseholdItem({
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'bedding'
            });

            item.validate(err => {
                expect(err.errors['clientId']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the submittedBy field is empty', done => {
            const item = new HouseholdItem({
                clientId: '12345678',
                name: 'bedding'
            });

            item.validate(err => {
                expect(err.errors['submittedBy']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the name field is empty', done => {
            const item = new HouseholdItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the name field is not an allowed value', done => {
            const item = new HouseholdItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'iPad'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.errors['name'].message).to.contain('is not a valid enum value');
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });
    });

    describe('itemCategory', () => {
        it('is set to Household', () => {
            const item = new HouseholdItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'bedding'
            });

            expect(item.itemCategory).to.equal('Household');
        });
    });
});

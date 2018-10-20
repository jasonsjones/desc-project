import mongoose from 'mongoose';
import { expect } from 'chai';
import Item from './baseitem-model';

mongoose.Promise = global.Promise;

describe('Base item model', () => {
    describe('field validations', () => {
        it('is valid when all required fields are provided', done => {
            const item = new Item({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'blanket'
            });

            item.validate(err => {
                expect(err).to.not.exist;
                done();
            });
        });

        it('is invalid if the clientId field is empty', done => {
            const item = new Item({
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'blanket'
            });

            item.validate(err => {
                expect(err.errors['clientId']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the submittedBy field is empty', done => {
            const item = new Item({
                clientId: '12345678',
                name: 'blanket'
            });

            item.validate(err => {
                expect(err.errors['submittedBy']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the name field is empty', done => {
            const item = new Item({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });
    });
});

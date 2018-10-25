import mongoose from 'mongoose';
import { expect } from 'chai';
import ClothingItem from './clothing-model';

mongoose.Promise = global.Promise;

describe.only('Clothing item model', () => {
    describe('field validations', () => {
        it('is valid when all required fields are provided', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err).to.not.exist;
                done();
            });
        });

        it('is invalid if the clientId field is empty', done => {
            const item = new ClothingItem({
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['clientId']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the submittedBy field is empty', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                name: 'shirt',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['submittedBy']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the name field is empty', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the gender field is empty', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['gender']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if the size field is empty', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'M'
            });

            item.validate(err => {
                expect(err.errors['size']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });
    });

    describe('itemCategory', () => {
        it('is set to Clothing', () => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'M',
                size: 'L (42-44)'
            });

            expect(item.itemCategory).to.equal('Clothing');
        });
    });
});

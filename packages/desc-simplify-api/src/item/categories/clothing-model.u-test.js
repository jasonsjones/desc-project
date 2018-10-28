import mongoose from 'mongoose';
import { expect } from 'chai';
import ClothingItem from './clothing-model';

mongoose.Promise = global.Promise;

describe('Clothing item model', () => {
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

        it('is valid when if no size is provided for a hat', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'hat',
                gender: 'F'
            });

            item.validate(err => {
                expect(err).to.not.exist;
                done();
            });
        });

        it('is valid when if no size is provided for a scarf', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'scarf',
                gender: 'F'
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

        it('is invalid if the size field is empty for anything other than a hat or scarf', done => {
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

        it('is invalid if requesting an unavailble clothing item ', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'tuxedo',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if a man requests a bra', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'bra',
                gender: 'M',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['name']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it('is invalid if gender is not M or F', done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'X',
                size: 'L (42-44)'
            });

            item.validate(err => {
                expect(err.errors['gender']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it("is invalid if a correct men's size is not provided", done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'M',
                size: 'LL (42-44)'
            });

            item.validate(err => {
                expect(err.errors['size']).to.exist;
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

        it("is invalid if a correct women's size is not provided", done => {
            const item = new ClothingItem({
                clientId: '12345678',
                submittedBy: '5bb69cb1322fdf5690edfc0b',
                name: 'shirt',
                gender: 'F',
                size: 'XL (10-12)'
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

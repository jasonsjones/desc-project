import Item from './baseitem-model';
import HouseholdItem from './categories/household-model';
import EngagementItem from './categories/engagement-model';
import ClothingItem from './categories/clothing-model';
import PersonalHygieneItem from './categories/personalhygiene-model';
import Note from '../note/note-model';

export const createItem = itemData => {
    if (!itemData) {
        return Promise.reject(new Error('item data is required'));
    }

    let newItem;
    switch (itemData.itemCategory) {
        case 'Clothing' || 'clothing':
            newItem = new ClothingItem(itemData);
            break;
        case 'Household' || 'household':
            newItem = new HouseholdItem(itemData);
            break;
        case 'Engagement' || 'engagement':
            newItem = new EngagementItem(itemData);
            break;
        case 'PersonalHygiene' || 'personalHygiene':
            newItem = new PersonalHygieneItem(itemData);
            break;
        default:
            return Promise.reject(new Error('item category is not provided'));
    }

    if (itemData.note) {
        let newNote = new Note();
        newNote.itemId = newItem._id;
        newNote.submittedBy = newItem.submittedBy;
        newNote.body = itemData.note;
        return newNote
            .save()
            .then(note => newItem.notes.push(note._id))
            .then(() => newItem.save());
    } else {
        return newItem.save();
    }
};

export const getItems = () => {
    return Item.find({})
        .populate({ path: 'submittedBy', select: 'name email' })
        .populate({
            path: 'notes',
            select: 'body',
            populate: { path: 'submittedBy', select: 'name' }
        })
        .exec();
};

export const getItem = id => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }

    return Item.findById(id)
        .populate({ path: 'submittedBy', select: 'name email' })
        .populate({
            path: 'notes',
            select: 'body',
            populate: { path: 'submittedBy', select: 'name' }
        })
        .exec();
};

export const updateItem = (id, itemData = {}) => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    const { itemCategory } = itemData;
    if (!itemCategory) {
        return Promise.reject(new Error('item category is required'));
    }
    let Category;
    switch (itemCategory) {
        case 'Clothing' || 'clothing':
            Category = ClothingItem;
            break;
        case 'Household' || 'household':
            Category = HouseholdItem;
            break;
        case 'Engagement' || 'engagment':
            Category = EngagementItem;
            break;
        case 'PersonalHygiene' || 'personalHygiene':
            Category = PersonalHygieneItem;
            break;
        default:
            break;
    }
    return Category.findByIdAndUpdate(id, itemData, { new: true }).exec();
};

export const deleteItem = id => {
    if (!id) {
        return Promise.reject(new Error('id paramater is required'));
    }
    return Item.findById(id)
        .exec()
        .then(item => {
            return item.remove();
        });
};

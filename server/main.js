import {Meteor} from "meteor/meteor";
import _ from 'lodash';
import {image, helpers} from 'faker';
import {Employees} from "../imports/collections/employees";

Meteor.startup(() => {
    //Generate fake data
    //Check if data already exists
    const numberRecords = Employees.find({}).count();

    if (!numberRecords) {
        //Generate data
        _.times(5000, () => {  //Syntactic sugar for a for loop
            const {name, email, phone} = helpers.createCard();

            Employees.insert({
                name, email, phone,
                avatar: image.avatar()
            });
        });
    }

    Meteor.publish('Employees', (per_page) => {
        return Employees.find({}, {limit: per_page});
    });
});
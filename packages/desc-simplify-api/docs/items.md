### Items End Points

### Items

`Items` in this context refers to any item requested for one of DESC's clients. The client is anonomyous and referenced only by their client identification (clientId) number.

An `item` is required to be in one of four categories:

1.  Clothing
2.  Household
3.  Personal Hygiene
4.  Engagement

Depending on the category of the item, there may be additional required information needed to be provided. For example, a `clothing` item will require a `size`, `gender`, and possibly a `style`, attributes.

The following endpoints are available for the `items` resource:

-   `POST /api/items`
-   `GET /api/items`
-   `GET /api/items/:id`
-   `PUT /api/items/:id`
-   `DELETE /api/items/:id`

#### Creating a new item (`Household`, `Personal Hygiene`, & `Engagement`)

```
POST /api/items
```

include a post body of the form

```json
{
    "clientId": "12345678",
    "submittedBy": "someuserId",
    "numberOfItems": 2,
    "urgency": "survival",
    "status": "active",
    "notes": [
        {
            "submittedBy": "someuserId",
            "body": "the text of the note"
        }
    ],
    "itemCategory": "Household",
    "name": "bedding"
}
```

The **required** properties are:

-   `clientId`
-   `submittedBy`
-   `itemCategory`
    -   Available values are `Clothing`, `Household`, `PersonalHygiene`, or `Engagment`

The **optional** properties are:

-   `numberOfItems` (defaults to 1)
-   `urgency` (defaults to `important`)
    -   Available values are `survivial`, `life-changing`, or `important`
-   `status` (defaults to `active`)
    -   Available values are `active`, `approved`, `wishlist`, `archive`, or `denied`

the JSON response will have the following shape:

```json
{
    "success": "true/false",
    "message": "descriptive message of the status",
    "payload": {
        "item": {
            "_id": "idOfTheItem",
            "clientId": "12345678",
            "submittedBy": {
                "_id": "idOfTheUser",
                "name": {
                    "first": "firstName",
                    "last": "lastName"
                },
                "email": "user@example.com"
            },
            "numberOfItems": 2,
            "urgency": "survival",
            "status": "active",
            "notes": [
                {
                    "_id": "idOfTheNote",
                    "submittedBy": {
                        "name": {
                            "first": "firstName",
                            "last": "lastName"
                        }
                    },
                    "body": "the text of the note"
                }
            ],
            "itemCategory": "Household",
            "name": "bedding"
        }
    }
}
```

_NOTE: The `submittedBy` and `notes` properties will be populated when the newly created item is returned_

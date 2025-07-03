/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qdzgjcg49j3fw5b",
    "created": "2025-07-03 22:24:41.025Z",
    "updated": "2025-07-03 22:24:41.025Z",
    "name": "articles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fovvoa71",
        "name": "field",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "lx5jpaad",
        "name": "field2",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qdzgjcg49j3fw5b");

  return dao.deleteCollection(collection);
})

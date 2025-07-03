/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdzgjcg49j3fw5b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bcbavgmw",
    "name": "Title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qdzgjcg49j3fw5b")

  // remove
  collection.schema.removeField("bcbavgmw")

  return dao.saveCollection(collection)
})

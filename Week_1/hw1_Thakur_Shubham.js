///////////////////////////////////////////////////////////
new_restaurant = { 
    "address" : {
        "building" : "1269", 
        "coord" : [
            -73.871194, 
            40.6730975
        ], 
        "street" : "Sutter Avenue", 
        "zipcode" : "11208"
    }, 
    "borough" : "Brooklyn", 
    "cuisine" : "Korean", 
    "name" : "Diane's Kitchen", 
    "restaurant_id" : "000001"
}


use msds697
// Make sure to keep the above lines at the beginning  ////
///////////////////////////////////////////////////////////

//Q1//
db.business.insert(new_restaurant)

//Q2//
db.business.updateMany({}, {$set:{"validated":true}},{upsert : true})

//Q3//
db.business.updateMany({}, {$unset:{"restaurant_id":""}} )

//Q4//
db.business.updateMany({}, {$rename:{"borough": "district"}})

//Q5//
db.business.find({"address.coord":[-73.871194, 40.6730975] },{"_id":false}).pretty()

///////////////////////////////////////////////////////////
// Make sure to keep the following line at the end    /////
db.business.drop()
///////////////////////////////////////////////////////////
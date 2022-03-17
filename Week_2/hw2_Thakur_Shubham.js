use msds697


// Question-1 with in operator
db.business.find({"cuisine":{$in:["Hamburgers","Americans"]}, 'address.zipcode':"11225"}).count()//.pretty()

// Question-1 with OR operator
//This problem could have been done with or operator as well. The solution would be:
//db.business.find({$or:[{'cuisine':'Hamburgers'}, {'cuisine':'Americans'}], 'address.zipcode':"11225" }).count()

//Question-2 
// In this case you can use either 1 or true. Both works. Also in sort values only 1/-1 works and not true/false
db.business.find({'name':{$regex:"\w*ice cream\w*", $options:'i'}}, {'name':true, '_id':0}).sort({'name': -1}).limit(3).pretty()

//Question-3
// atleast one of the value in array gt 100. Then with elematch we chose to show only fields of grades with grade == A
db.business.find({'address.coord':{$gte:100}}, {'address.coord':1,'grades':{$elemMatch:{'grade':'A'}},'name':1, '_id':0}).sort({'name':1}).pretty()

//Questiosn-4
//First step: select names with Starbucks, then set$[pointer] is used to upgrade all the values and 
//not the sigle value. then array filter is the additional filtering criteri
db.business.updateMany({'name': 'Starbucks'},{$set:{"grades.$[pointer].grade":"B"}}, {arrayFilters:[{"pointer.score":{$lt:10}}], multi:true})

//Question -5 
//First select the name starbucks, then its all about projecting the required fields
db.business.find({'name':'Starbucks'},{'grades':true, 'restaurant_id': true,'_id':0}).sort({'restaurant_id':1}).limit(1).pretty()
 
// Dropping the Database ..............
db.business.drop()                
                   
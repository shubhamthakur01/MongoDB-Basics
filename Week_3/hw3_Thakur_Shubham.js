// https://docs.mongodb.com/v4.0/reference/operator/aggregation/

use msds697

//db.business.find({})

//db.business.aggregate({$match:{"grades.grade":{$ne:"Not Yet Graded"}}})

//Question-1
//db.business.aggregate({$project:{"_id":0, "grades":true,
//                                    "grade_" : 
//                                     {$filter:{input:"$grades", as:"grades_graded", 
//                                        cond:{$ne:["$$grades.grade","Not Yet Graded"]}  
//                                              }
//                                     }
//                                     
//                                }})


db.business.aggregate({$project:{"grades":1,"_id":false}},
                            {$unwind:"$grades"},
                        {$match:{"grades.grade":{$ne:"Not Yet Graded"}}}, 
                           
                        { $group : { _id: null, max: { $max : "$grades.score"}, min: {$min : "$grades.score"} }},
                        {$project:{"_id":false, "min":"$min", "max":"$max"}}
                      ).pretty()

//                        {    
//                            $group:{"_id":{score:"$grades.score"}}
//                        
//                        }


//Question-2
db.business.aggregate({$group:{"_id":"$cuisine", count:{$sum:1}}},
                        {$project:{"_id":false,"count":{$convert:{input:"$count",to:"int"}}, "cuisine":"$_id"}},{$sort:{"count":-1}},{$limit:5} ).pretty()
                        


//Question-3

//db.business.aggregate({$group:{"_id":"$name", "count":{$sum:1} }
//                        }, {$sort:{"count":-1}},
//                        
//                        
//                        )

//Here we first created a array with all the elements in particular group. We selected the one with max count. Further if you directly sort 
//in that array, it was not working as the sort function only works at document level. Thus we had to unwind given set of array first and sort 
//then push again in the array. I tried mergeSet first but it was removing the repeating address thus used push.

db.business.aggregate({$group:{"_id":"$name", merged_address: {$push: "$address" }, "count":{$sum:1}  }
                        }, {$sort:{"count":-1}},
                            {$limit:1},
                            {$project:{"address_list":"$merged_address", "count":"$count", name:"$_id", "_id":false}},
                            {$unwind:"$address_list"},
                            {$sort:{"address_list.zipcode":1, "address_list.street":1, "address_list.building":1, "address_list.coord":1}},
                            {$group:{"_id":"$name", merged_address: {$push: "$address_list" }, max: { $max : "$count"} } },
                            {$project:{"address_list":"$merged_address", "count": {$convert:{input:"$max",to:"int"}}, name:"$_id", "_id":false}}
                        ).pretty()

//db.business.aggregate({$group:{"_id":"$name",  merged_address: {$push: "$address" },"count":{$sum:1}  }
//                        }, {$sort:{"count":-1}},
//                            {$limit:1},
//                            {$project:{  then: { $size: "$merged_address"}, "address_list":"$merged_address", "count":"$count", name:"$_id", "_id":false }}
//                            
//                     )

//{$sort:{"address_list.zipcode":1}}




//, "address_list.street":1, "address_list.building":1, "address_list.coord":1
//Question-4
db.business.aggregate({$project:{"grades":1}},
                        {$unwind:"$grades"}, 
                        {$group:{"_id":{date:
                                            "$grades.date"}, "count":{$sum:1} }}, {$sort:{"count":-1}}, 
                                            {$project:{"count":1, "date":"$_id.date", "_id":false}},  {$limit:5}).pretty()
                                            


//[
//> 				-73.7971565,
//> 				40.5904747




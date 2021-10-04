var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var ObjectModel = require('../models/create');

var ObjectType = new GraphQLObjectType({
    name: 'object',
    fields: function() {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            font: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            }
        }
    }
})

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function(){
        return {
            objects: {
                type: new GraphQLList(ObjectType),
                resolve: function() {
                    const objects = ObjectModel.find().exec()
                    if(!objects){
                        throw new Error('Error')
                    }
                    return objects
                }
            },
            object: {
                type: ObjectType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function() {
                    const objectDetail = ObjectModel.find().exec()
                    if(!objectDetail){
                        throw new Error('Error')
                    }
                    return objectDetail
                }
            }
        }
    }
})

var mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: function() {
        return {
            addObject: {
                type: ObjectType,
                args: {
                    text:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    objects:{
                        type: new GraphQLNonNull(GraphQLList(GraphQLString))
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    font: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                }
            },
            resolve: function(root, params){
                const objectModel = new ObjectModel(params);
                const newObject = objectModel.save();
                if(!newObject){
                    throw new Error('Error')
                }
                return newObject
            },
            updateObject: {
                type: ObjectType,
                args: {
                    id: {
                        name: "id",
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    font: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params){
                    return ObjectModel.findByIdAndUpdate(params.id, {text: params.text, color: params.color, font: params.font, fontSize: params.fontSize},
                    function(err){
                        if(err) return next(err);
                    })
                }
            },
            removeObject: {
                type: ObjectType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params){
                    const remObject = ObjectModel.findByIdAndRemove(params.id).exec();
                    if(!remObject){
                        throw new Error('Error')
                    }
                    return remObject
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});
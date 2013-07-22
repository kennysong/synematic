Meteor.methods({
	'get_room' : function (room_id){
		return Rooms.findOne({'room_id':room_id});
	},

	'create_room' : function (room_id, file_url) {
		Rooms.insert({'room_id':room_id, 'paused':1, 'file_url':file_url});
	}
})

Meteor.publish("rooms", function (room_id) {
    return Rooms.find({'room_id':room_id});
});
const functions = require('firebase-functions');

exports.addToFollowing = functions.database.ref('/follow/{initiatorUid}/{interestedInFollowingUid}')
    .onCreate(
        (snapshot, event) => {
            const initiatorUid = event.params.initiatorUid;
            const interestedInFollowingUid = event.params.interestedInFollowingUid;
            const rootRef = snapshot.ref.root;
            let FollowingMeRef = rootRef.child('userFollowingMe/' + interestedInFollowingUid + "/" + initiatorUid);
            return FollowingMeRef.set(true);
        }
    );

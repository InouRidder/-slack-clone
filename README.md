Slack clone to try out Action Cable functionality.

bugs

-> See if a user is online
this is quite buggy, I am storing id's of users that are online in a class variable on the ChatRoomChannel class, not sure how this is persisted or even where the object lives, seems like i'll have to go for a more persistant (DB) approach

-> TODO: Load all channels when click on modal
Now refresh is required if someone is already logged on and new channels are created.

-> Last visit should be updated upon leaving a channel --> if not subscribing to new channel subscription not ended.


-> possible refacto: no deleting subscriptions, only setting the is_watching state to false


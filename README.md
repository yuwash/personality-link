## Personality Links

This app allows users to create a unique "personality link" based on their experiences in different places and interactions. The link is a serialized string that can be shared and potentially used to match with others who have similar experiences.

The user interface features two dropdowns: one for selecting a 'place' and another for selecting an 'interaction'. Users can combine a place and an interaction to form a statement about their personality (the statement being that this aspect of the place is important to oneself). These statements are listed below the dropdowns and can be reordered to reflect the user's priorities, with the most important statements at the top of the list. The order of the statements in the list is preserved in the serialized personality link.

### V1 Serialization Scheme

The personality link is serialized using a simple scheme:

`v1;placeId1-interactionId1;placeId2-interactionId2;...`

For example, a link representing an experience in the underground (`lupa`) that was collaborative (`esun`) and an experience at home (`tomo`) that was kind (`pilin`) would be serialized as: `v1;lupa-esun;tomo-pilin`

### Use of Toki Pona Words

The app utilizes words from the constructed language Toki Pona for `placeId` and `interactionId`. Toki Pona has a small vocabulary and simple grammar, which allows for a versatile and abstract representation of places and interactions. This makes the personality links less about specific real-world locations or rigid interaction types and more about the general feeling or nature of the experience. This allows for a wider range of interpretations and potential uses for the personality links.
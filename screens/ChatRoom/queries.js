export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          id
          chatRoom {
            id
            LasteMessage {
              id
              text
              createdAt
            }
            users {
              items {
                id
                user {
                  id
                  name
                  image
                }
              }
            }
          }
        }
      }
    }
  }
`;
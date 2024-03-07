import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";

const store = {
  _state: {
    profilePage: {
      postsData: [
        {
          post: 'This is my first post here',
          imgSrc: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg',
          name: 'Petya',
        },
        {
          post: 'This is my first post here',
          imgSrc: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/61fbe9835120f670060507.jpg',
          name: 'Nastya',
        },
        {
          post: 'This is my first post here',
          imgSrc: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg',
          name: 'Nastya',
        },
      ],
      newPost: ''
    },
    dialogsPage: {
        usersData: [
          {name: "Petya",id: 1,},
          {name: "Nastya",id: 2},
          {name: 'Nikita',id: 3}
        ],
        messagesData: [
          {name: 'Petya', message: 'Hello! How are you?', income: true},
          {name: 'You', message: 'Hallo! I fine', income: false},
          {name: 'Petya', message: 'Nice!', income: true},
          {name: 'You', message: 'Hallo! I fine', income: false},
          {name: 'Petya', message: 'Nice!', income: true},
          {name: 'You', message: 'Hallo! I fine', income: false},
          {name: 'Petya', message: 'Nice!', income: true},
        ],
        newMessage: ''
    },
    sideBar: {
      friends: [
        {id: 0, name: "Nastya S", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/61fbe9835120f670060507.jpg'},
        {id: 1, name: "Mark F", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
        {id: 2, name: "Petya V", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
      ]
    }
  },
  _callSubscriber() {},
  getState() {
    return this._state
  },
  subscribe (observer) {
    this._callSubscriber = observer;
  },
  dispatch (action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

    this._callSubscriber(this._state)

  }
}

export default store;
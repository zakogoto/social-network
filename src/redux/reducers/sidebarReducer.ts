
const initialState = {
  friends: [
    {id: 0, name: "Nastya S", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/61fbe9835120f670060507.jpg'},
    {id: 1, name: "Mark F", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
    {id: 2, name: "Petya V", src: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
  ]
}

type InitialStateType = typeof initialState

export const sidebarReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
  switch (action.type){
      default:
        return state
  }
}
export const updateObject = (items, itemId, objectPropName, newObjectProp) => {
    
    return items.map(item => {
        if(item[objectPropName] === itemId) {
            return {...item, ...newObjectProp}
        }
        return item
    })

    
}
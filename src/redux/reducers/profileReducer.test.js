import profileReducer, { addNewPost, deletePost } from "./profileReducer"
import React from "react";

const state = {
  postsData: [
    {id: 0, message: 'YO'},
    {id: 1, message: 'YOYO'},
    {id: 2, message: 'YOYOYO'},
    {id: 3, message: 'AHAHAHAHAH'},
  ]
}

it('after adding post postsData should be increment', () => {
  // 1. test data
  let action = addNewPost('Samurai');

  // 2.action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(5)

});

it('message of new post should be correct', () => {
  // 1. test data
  let action = addNewPost('Samurai');

  // 2.action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData[0].message).toBe('Samurai') 

});

it('after deleting post postsData should be decrement', () => {
  // 1. test data
  let action = deletePost(1);

  // 2.action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(3)

});

it('after deleting post postsData shouldn\'t be decrement', () => {
  // 1. test data
  let action = deletePost(1000);

  // 2.action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.postsData.length).toBe(4)

});


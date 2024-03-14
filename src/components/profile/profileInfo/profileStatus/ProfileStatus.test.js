import { create } from "react-test-renderer"
import React from 'react';
import TestRenderer from 'react-test-renderer'; 
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', ()=> {
    test('status props should be in the state', () => {
        const component = create(<ProfileStatus status="Samurai"/>);
        const instance = component.getInstance();
        expect(instance.props.status).toBe("Samurai");
    });
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status="Samurai"/>);
        const instance = component.getInstance();
        let span = instance.findAllByType('span')
        expect(span.length).toBe(1);
    });
})
import React from 'react'

import LoginScreen from '../LoginScreen'
// import {render, fireEvent} from '@testing-library/react-native'
import renderer from 'react-test-renderer';

describe("Login Screen",()=>{

    it("Should have needed elements for loggin in", ()=>{
        const page = renderer.create(<LoginScreen/>).toJSON()
        expect(tree.children.length).toBe(1);
        // const emailInput = page.getByTestId("emailInput")
        // const passwordInput = page.getByTestId("passwordInput")
        // const loginButton = page.getByTestId("loginButton")
        // expect(false).toBeTruthy();
    })


    it("Sdasdadasdasin", ()=>{

        // const emailInput = page.getByTestId("emailInput")
        // expect(false).toBeTruthy();
    })
})
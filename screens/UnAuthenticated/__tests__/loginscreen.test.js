import React from 'react'

import LoginScreen from '../LoginScreen'
import {render, fireEvent} from '@testing-library/react-native'

describe("Login Screen",()=>{

    it("Should have needed elements for loggin in", ()=>{
        const page = render(<LoginScreen/>)


        // const emailInput = page.getByTestId("emailInput")
        // const passwordInput = page.getByTestId("passwordInput")
        const loginButton = page.getByTestId("loginButton")
        // expect(false).toBeTruthy();
    })
})
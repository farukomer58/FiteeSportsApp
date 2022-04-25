import React from 'react'

import LoginScreen from '../LoginScreen'
import {render} from '@testing-library/react-native'

describe("Login Screen",()=>{
    it("Should go to home page on login", ()=>{
        const page = render(<LoginScreen/>)
        expect(false).toBeTruthy();
    })
})
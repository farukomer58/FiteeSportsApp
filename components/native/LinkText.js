import React from 'react';
import { Linking, Pressable, Text } from 'react-native';

import Values from '../../constants/Values';

export default LinkText = props => {
    return (
        <Pressable onPress={props.onPress}>
            {({ pressed }) =>
                <Text style={{
                    textDecorationLine: 'underline',
                    color: props.pressedColor? (pressed ? props.pressedColor : props.releaseColor):(pressed ? Values.successColor : Values.secondaryColor),
                    ...props.style,
                }}>{props.children}</Text>
            }
        </Pressable>
    )
}
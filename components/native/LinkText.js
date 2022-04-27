import React from 'react';
import { Linking, Pressable, Text } from 'react-native';

import Values from '../../constants/Values';

export default LinkText = props => {
    return (
        <Pressable onPress={props.onPress}>
            {({ pressed }) =>
                <Text style={{
                    ...props.style,
                    textDecorationLine: 'underline',
                    color: pressed ? Values.successColor : Values.secondaryColor
                }}>{props.children}</Text>
            }
        </Pressable>
    )
}
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'

// Icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Custom
import ChatGroupCard from '../../../components/chat/ChatGroupCard';

const DATA = [
    {
        id: 1,
        groupImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        groupName: "Basketball Community Amsterdam West",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },
    {
        id: 2,
        groupImage: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        groupName: "Tennis with the squad",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },
    {
        id: 3,
        groupImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        groupName: "Basketball Community Amsterdam West",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },
    {
        id: 4,
        groupImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        groupName: "Basketball Community Amsterdam West",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },
    {
        id: 5,
        groupImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        groupName: "Basketball Community Amsterdam West",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },
    {
        id: 6,
        groupImage: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        groupName: "Basketball Community Amsterdam West",
        groupLastMessage: "Welcome to the Basketball Community Amsterdam West group lets have a fun time",
        groupLastMessageTime: "10:30PM",
    },

];

export default function ChatRoomScreen(props) {

    const renderChatGroupItem = ({ item }) => (
        <ChatGroupCard
            onPress={() => props.navigation.navigate("ChatConversation", { groupId: item.id, groupName: item.groupName })}
            groupImage={item.groupImage}
            groupName={item.groupName}
            groupLastMessage={item.groupLastMessage}
            groupLastMessageTime={item.groupLastMessageTime}

        />
    )

    return (
        <View style={styles.background}>
            <FlatList
                data={DATA}
                renderItem={renderChatGroupItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerShown: false,
        headerTitle: "Group Name Here",
        title: 'Chat',
        tabBarBadge: 3,
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
        ),
        // headerLeft: (props) => (
        //     <Text>Hello</Text>
        // )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#313131"
    },
})
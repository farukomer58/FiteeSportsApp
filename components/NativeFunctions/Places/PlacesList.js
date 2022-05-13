import { FlatList, View, Text,StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

export default function PlacesList(props) {

    const renderPlace = itemData => {
        return <PlaceItem
            place={itemData.item}
            onPress={() => { }}
        />
    }

    if (props.places.length === 0 || !props.places) {
        return <View style={styles.fallBackContainer}>
            <Text style={styles.fallBackText}>No Places added yet, start adding some</Text>
        </View>
    }
    return <FlatList
        data={props.places}
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
    />
}

const styles = StyleSheet.create({
    fallBackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallBackText: {
        fontSize: 16,
    },
})
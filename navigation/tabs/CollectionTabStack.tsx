import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MyCollectionScreen from '../../screens/collectionTab/MyCollectionScreen';
import MyBookDetailsScreen from '../../screens/collectionTab/MyBookDetailsScreen';
import MyRequestScreen from '../../screens/collectionTab/MyRequestScreen';
import MySentRequestScreen from '../../screens/collectionTab/MySentRequestScreen';
import NewBookScreen from '../../screens/collectionTab/NewBookScreen';

const CollectionStack = createStackNavigator<CollectionParamList>();

export default function CollectionTabStack() {
    return (
        <CollectionStack.Navigator>
            <CollectionStack.Screen
                name="MyCollectionScreen"
                component={MyCollectionScreen}
                options={{ headerTitle: 'My Collection' }}
            />
            <CollectionStack.Screen
                name="MyBookDetailsScreen"
                component={MyBookDetailsScreen}
                options={{ headerTitle: 'Book Details' }}
            />
            <CollectionStack.Screen
                name="MyRequestScreen"
                component={MyRequestScreen}
                options={{ headerTitle: 'Request' }}
            />
            <CollectionStack.Screen
                name="MySentRequestScreen"
                component={MySentRequestScreen}
                options={{ headerTitle: 'Sent Request' }}
            />
            <CollectionStack.Screen
                name="NewBookScreen"
                component={NewBookScreen}
                options={{ headerTitle: 'Add a New Book' }}
            />
        </CollectionStack.Navigator>
    )
}

const styles = StyleSheet.create({})
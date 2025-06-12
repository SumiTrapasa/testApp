import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Header from '../components/EventHeader';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';

function EventScreen() {

    const {
        data: events = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    if (isError) {
        return (
            <View>
                <Text>Error fetching events</Text>
                <Text>{(error as Error).message}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {isLoading || !events ? <ActivityIndicator style={styles.container} />
                :
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => item.event_id + index}
                    renderItem={({ item, index }) => <EventCard event={item} index={index} />}
                    contentContainerStyle={styles.eventstyle}
                    showsVerticalScrollIndicator={false}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    eventstyle: {
        paddingHorizontal: 10,
        gap: 12,
        marginTop: 24,
        paddingBottom: 40,
    },
});

export default EventScreen;

import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/EventHeader';
import EventCard from '../components/EventCard';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function FavoriteScreen() {
    const {
        data: events = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });
    const favorites = useSelector((state: RootState) => state.favorites);
    const favoriteEvents = favorites
        .map((favIndex: number) => {
            const event = events[favIndex];
            return event ? { ...event, originalIndex: favIndex } : null;
        })
        .filter((e) => e !== null);

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
                    data={favoriteEvents}
                    keyExtractor={(item, index) => item.event_id + index}
                    renderItem={({ item }) => <EventCard event={item} index={item.originalIndex} />}
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

export default FavoriteScreen;

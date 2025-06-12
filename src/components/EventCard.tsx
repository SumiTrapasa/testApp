import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleFavorite } from '../redux/favoriteSlice';

interface DanceStyle {
  ds_id: number;
  ds_name: string;
}

interface EventCardProps {
  index:number,
  event: {
    event_name: string;
    readable_from_date: string;
    event_profile_img: string;
    event_price_from: number;
    event_price_to: number;
    city: string;
    country: string;
    keywords: string[];
    danceStyles: DanceStyle[];
  };
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
 const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.includes(index);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(index));
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: event.event_profile_img }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {event.event_name}
          </Text>
          <Icon name="chevron-forward" size={20} color="#000" />
        </View>

        <Text style={styles.datetime}>
          {event.readable_from_date} | 19:00 - 02:00
        </Text>

        <View style={styles.subInfo}>
          <Text style={styles.price}>
            {event.event_price_from === 0 && event.event_price_to === 0
              ? 'Free'
              : `€${event.event_price_from} - €${event.event_price_to}`}
          </Text>
          <Text style={styles.location}>
            {event.city}, {event.country}
          </Text>
        </View>

        <View style={styles.shareLike}>
          <View style={styles.tags}>
            {event.danceStyles?.map((style) => (
              <View key={style.ds_id} style={styles.tag}>
                <Text style={styles.tagText}>{style.ds_name}</Text>
              </View>
            ))}
          </View>
          <Icon name="share-outline" size={20} color="#000" />
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={20} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    height: 94,
    shadowColor: '#88A6FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181A1F',
    flex: 1,
    marginRight: 5,
  },
  datetime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#34A853',
    opacity: 0.8,
  },
  subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  price: {
    fontSize: 11,
    color: '#828282',
    opacity: 0.8,
  },
  location: {
    fontSize: 11,
    color: '#828282',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow:'hidden',
    gap:4,
    marginTop: 4,
    width:'80%',
  },
  tag: {
    backgroundColor: '#F5F7FC',
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#181A1F',
    opacity: 0.8,
    fontWeight: '500',
  },
  shareLike:{
    flexDirection:'row',
    alignItems:'center',
  },
});

export default EventCard;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

export default function RatingPage() {
  const [rating, setRating] = useState({
    communication: 0,
    understading: 0,
    solutions: 0,
    commitment: 0
  })

  const communicationRating = (newRating) => {
    setRating((prevRating) => ({
        ...prevRating, // Keep the previous ratings
        communication: newRating // Update only the communication rating
      }));    console.log(`Communication Rating is: ${newRating}`)
  };
  
  const understandingRating = (newRating) => {
    setRating((prevRating) => ({
        ...prevRating, // Keep the previous ratings
        understading: newRating // Update only the communication rating
      }));    console.log(`Understading Rating is: ${newRating}`)
  };  
  
  const solutionsRating = (newRating) => {
    setRating((prevRating) => ({
        ...prevRating, // Keep the previous ratings
        solutions: newRating // Update only the communication rating
      }));    console.log(`Solution Rating is: ${newRating}`)
  };  
  
  const commitmentRating = (newRating) => {
    setRating((prevRating) => ({
        ...prevRating, // Keep the previous ratings
        commitment: newRating // Update only the communication rating
      }));
    console.log(`Commitment Rating is: ${newRating}`)
  };

    useEffect(() => {
        console.log(rating)
    }, [rating]);    


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Communication: {rating.communication}</Text>
      <Rating
        startingValue={0}
        onFinishRating={communicationRating}
        style={styles.rate}
      />
      <Text style={styles.text}>Understanding: {rating.understading}</Text>
      <Rating
        startingValue={0}
        onFinishRating={understandingRating}
        style={styles.rate}
      />
      <Text style={styles.text}>Providing Solutions: {rating.solutions}</Text>
      <Rating
        startingValue={0}
        onFinishRating={solutionsRating}
        style={styles.rate}
      />
      <Text style={styles.text}>Commitment: {rating.commitment}</Text>
      <Rating
        startingValue={0}
        onFinishRating={commitmentRating}
        style={styles.rate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    rate: { 
        padding: 5,
        borderWidth: 1, 
        borderColor: '#f1c40f', 
        borderRadius: 15,
        marginBottom: 5,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    }
})

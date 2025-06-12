import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  labelText: string;
  helper_text_Input?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  labelText,
  helper_text_Input = '',
  style,
  ...rest
}) => {

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        underlineColor="transparent"
        contentStyle={styles.text}
        style={[styles.input, style]}
        placeholderTextColor="#999"
        {...rest}
      />
      {helper_text_Input && <Text style={styles.helperText}>{helper_text_Input}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 336,
    alignSelf: 'center',
    gap: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  input: {
    height: 32,
    backgroundColor: 'white',
    borderWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  helperText:{
    color:'#828282',
    fontSize:12,
    lineHeight:16,
    letterSpacing:0,
    textAlign:'right',
  },
  text:{
    color:'#000',
  },
});

export default CustomTextInput;

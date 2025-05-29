import { Color } from "@/src/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type SearchInputProps = {
  onPress?: () => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onSubmit?: (text: string) => void;
  onClear?: () => void;
  value?: string;
  props?: TextInputProps;
  autoFocus?: boolean;
};

export const SearchBar: FC<SearchInputProps> = ({
  onPress,
  onChange,
  onSubmit,
  onClear,
  value,
  props,
  autoFocus = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={value}
          onChange={onChange}
          onSubmitEditing={(e) => onSubmit?.(e.nativeEvent.text)}
          autoFocus={autoFocus}
          returnKeyType="search"
          {...props}
        />
        {value ? (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close" size={24} color={Color.smoke} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="search" size={24} color={Color.smoke} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
    paddingBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.white,
    borderWidth: 2,
    borderColor: Color.smoke,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
});

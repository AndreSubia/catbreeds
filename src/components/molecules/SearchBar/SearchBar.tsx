import { Color } from "@/src/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { FC, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type SearchInputProps = {
  onPress?: () => void;
  onChange?: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  value?: string;
  props?: TextInputProps;
  autoFocus?: boolean;
  placeholder?: string;
};

const SearchBar: FC<SearchInputProps> = ({
  onChange,
  onSubmit,
  onClear,
  value,
  props,
  autoFocus = false,
  placeholder = "Search",
}) => {
  const ref = useRef<TextInput>(null);

  const handleOnPressIcon = () => {
    if (!ref.current?.isFocused?.()) {
      ref.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
          placeholderTextColor={Color.smoke}
          {...props}
        />
        {value ? (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close" size={24} color={Color.smoke} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleOnPressIcon}>
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
    color: Color.black,
  },
});

export default SearchBar;

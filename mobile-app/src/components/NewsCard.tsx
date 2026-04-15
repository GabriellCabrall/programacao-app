import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { NewsItem } from "../data/news";

type Props = {
  item: NewsItem;
  onPress?: () => void;
};

export function NewsCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.textArea}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  image: {
    width: 120,
    height: 70,
    borderRadius: 4,
  },
  textArea: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Inter",
  },
});
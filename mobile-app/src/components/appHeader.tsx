import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLogo } from "./AppLogo";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  showMenu?: boolean;
  showBack?: boolean;
  onLeftPress?: () => void;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
};

export function AppHeader({
  showMenu,
  showBack,
  onLeftPress,
  onSearchPress,
  onProfilePress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <Pressable onPress={onLeftPress} style={styles.left}>
        {showMenu && (
          <Ionicons name="menu" size={26} color={colors.textPrimary} />
        )}
        {showBack && (
          <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
        )}
      </Pressable>

      <AppLogo size="md" />

      <View style={styles.right}>
        <Pressable onPress={onSearchPress}>
          <Ionicons
            name="search-outline"
            size={22}
            color={colors.textPrimary}
          />
        </Pressable>

        <Pressable onPress={onProfilePress}>
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={colors.textPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  left: {
    width: 32,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 2,
  },
});

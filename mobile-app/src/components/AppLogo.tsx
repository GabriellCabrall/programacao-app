import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
  centered?: boolean;
};

export function AppLogo({
  size = "md",
  centered = true,
}: AppLogoProps) {
  const fontSizes = {
    sm: { real: 34, news: 34, line: 38, gap: 2, offset: 34, width: 120 },
    md: { real: 44, news: 44, line: 48, gap: 4, offset: 44, width: 150 },
    lg: { real: 64, news: 64, line: 70, gap: 6, offset: 62, width: 220 },
  };

  const current = fontSizes[size];

  return (
    <View
      style={[
        styles.container,
        { width: current.width },
        centered && styles.centered,
      ]}
    >
      <Text
        style={[
          styles.real,
          {
            fontSize: current.real,
            lineHeight: current.line,
          },
        ]}
      >
        Real
      </Text>

      <Text
        style={[
          styles.news,
          {
            fontSize: current.news,
            lineHeight: current.line,
            marginTop: current.gap,
            marginLeft: current.offset,
          },
        ]}
      >
        News
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  centered: {
    alignSelf: "center",
  },
  real: {
    color: colors.textPrimary,
    fontFamily: "Imbue",
  },
  news: {
    color: colors.accent,
    fontFamily: "Imbue",
  },
});
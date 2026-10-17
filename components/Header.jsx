import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Switch, Text, useTheme } from "react-native-paper";
import { useStore } from "../zustand";

export default function Header({ title, subtitle }) {
  const theme = useTheme();
  const { modoEscuro, toggleModoEscuro } = useStore();

  return (
    <Appbar.Header elevated style={{ backgroundColor: theme.colors.surface }}>
      <Appbar.Content
        title={title}
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
        subtitle={subtitle}
      />
      <View style={styles.themeToggle}>
        <Text variant="labelSmall" style={{ marginRight: 6, color: theme.colors.onSurfaceVariant }}>
          {modoEscuro ? "Escuro" : "Claro"}
        </Text>
        <Switch value={modoEscuro} onValueChange={toggleModoEscuro} color={theme.colors.primary} />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
});

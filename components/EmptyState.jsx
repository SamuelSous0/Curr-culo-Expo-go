import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, List, Text, useTheme } from "react-native-paper";

export default function EmptyState({ icon = "alert-circle-outline", title, description, onRetry }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <List.Icon icon={icon} color={theme.colors.onSurfaceVariant} style={styles.icon} />
      <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          {description}
        </Text>
      ) : null}
      {onRetry ? (
        <Button mode="outlined" onPress={onRetry} style={styles.button}>
          Tentar novamente
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    marginTop: 40,
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

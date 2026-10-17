import React from "react";
import { Tabs } from "expo-router";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useStore } from "../zustand";

const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2563EB",
    secondary: "#0284C7",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceVariant: "#F1F5F9",
    onSurface: "#0F172A",
    outline: "#CBD5E1",
  },
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#60A5FA",
    secondary: "#38BDF8",
    background: "#0F172A",
    surface: "#1E293B",
    surfaceVariant: "#334155",
    onSurface: "#F8FAFC",
    outline: "#475569",
  },
};

export default function RootLayout() {
  const modoEscuro = useStore((state) => state.modoEscuro);
  const theme = modoEscuro ? customDarkTheme : customLightTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={modoEscuro ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: modoEscuro ? "#94A3B8" : "#64748B",
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="academico"
          options={{
            title: "Acadêmico",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="school" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profissional"
          options={{
            title: "Profissional",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="briefcase" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="projetos"
          options={{
            title: "Projetos",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="code-tags" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sobre"
          options={{
            title: "Sobre",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

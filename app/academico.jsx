import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { academicService } from "../services/api";
import { useStore } from "../zustand";

export default function AcademicoScreen() {
  const theme = useTheme();
  const { perfilAtivoId } = useStore();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchAcademic = async () => {
    try {
      setError(null);
      const data = await academicService.getByProfile(perfilAtivoId);
      setExperiences(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as experiências acadêmicas.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAcademic();
  }, [perfilAtivoId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAcademic();
  }, [perfilAtivoId]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Formação Acadêmica" subtitle="Cursos e Graduações" />

      {loading ? (
        <Loading message="Carregando formações acadêmicas..." />
      ) : error ? (
        <EmptyState title="Ops!" description={error} onRetry={fetchAcademic} />
      ) : experiences.length === 0 ? (
        <EmptyState
          icon="school-outline"
          title="Nenhuma formação cadastrada"
          description="Nenhum registro acadêmico encontrado para este perfil."
          onRetry={fetchAcademic}
        />
      ) : (
        <FlatList
          data={experiences}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />}
          renderItem={({ item }) => (
            <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
              <Card.Title
                title={item.curso}
                titleVariant="titleMedium"
                titleStyle={{ fontWeight: "bold" }}
                subtitle={item.instituicao}
                subtitleStyle={{ color: theme.colors.primary }}
                left={(props) => (
                  <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <MaterialCommunityIcons name="school" size={26} color={theme.colors.primary} />
                  </View>
                )}
              />
              <Card.Content>
                <View style={styles.periodRow}>
                  <Chip icon="calendar-range" style={styles.periodChip} textStyle={{ fontSize: 12 }}>
                    {item.inicio} até {item.fim || "Presente"}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  periodRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  periodChip: {
    height: 32,
  },
});

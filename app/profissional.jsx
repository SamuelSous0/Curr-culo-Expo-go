import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { professionalService } from "../services/api";
import { useStore } from "../zustand";

export default function ProfissionalScreen() {
  const theme = useTheme();
  const { perfilAtivoId } = useStore();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfessional = async () => {
    try {
      setError(null);
      const data = await professionalService.getByProfile(perfilAtivoId);
      setExperiences(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as experiências profissionais.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProfessional();
  }, [perfilAtivoId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfessional();
  }, [perfilAtivoId]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Trajetória Profissional" subtitle="Histórico de Carreiras e Cargos" />

      {loading ? (
        <Loading message="Carregando experiências profissionais..." />
      ) : error ? (
        <EmptyState title="Ops!" description={error} onRetry={fetchProfessional} />
      ) : experiences.length === 0 ? (
        <EmptyState
          icon="briefcase-outline"
          title="Nenhuma experiência cadastrada"
          description="Nenhum registro profissional encontrado para este perfil."
          onRetry={fetchProfessional}
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
                title={item.cargo}
                titleVariant="titleMedium"
                titleStyle={{ fontWeight: "bold" }}
                subtitle={item.empresa}
                subtitleStyle={{ color: theme.colors.primary, fontWeight: "600" }}
                left={(props) => (
                  <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <MaterialCommunityIcons name="briefcase-check" size={26} color={theme.colors.primary} />
                  </View>
                )}
              />
              <Card.Content>
                <View style={styles.periodRow}>
                  <Chip
                    icon="calendar-clock"
                    style={styles.periodChip}
                    textStyle={{ fontSize: 12 }}
                  >
                    {item.inicio} até {item.fim || "Atualmente"}
                  </Chip>
                </View>

                {item.descricao ? (
                  <Text
                    variant="bodyMedium"
                    style={[styles.descricao, { color: theme.colors.onSurfaceVariant }]}
                  >
                    {item.descricao}
                  </Text>
                ) : null}
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
    marginBottom: 10,
  },
  periodChip: {
    height: 32,
  },
  descricao: {
    lineHeight: 22,
    marginTop: 4,
  },
});

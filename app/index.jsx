import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, RefreshControl, Linking } from "react-native";
import { Avatar, Button, Card, Chip, Divider, SegmentedButtons, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { profileService } from "../services/api";
import { useStore } from "../zustand";

export default function HomeScreen() {
  const theme = useTheme();
  const { perfilAtivoId, setPerfilAtivoId } = useStore();

  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    try {
      setError(null);
      const data = await profileService.getAll();
      setProfiles(data);

      const active = data.find((p) => p.id === perfilAtivoId) || data[0];
      if (active) {
        setCurrentProfile(active);
        setPerfilAtivoId(active.id);
      }
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os perfis. Verifique sua conexão.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      const active = profiles.find((p) => p.id === perfilAtivoId) || profiles[0];
      setCurrentProfile(active);
    }
  }, [perfilAtivoId, profiles]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfiles();
  }, [perfilAtivoId]);

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Erro ao abrir link:", err));
    }
  };

  if (loading) {
    return <Loading message="Conectando à API na Vercel..." />;
  }

  if (error && !currentProfile) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Header title="Currículo Express" subtitle="Início" />
        <EmptyState title="Erro de Conexão" description={error} onRetry={fetchProfiles} />
      </View>
    );
  }

  const initials = currentProfile?.nome
    ? currentProfile.nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CE";

  const profileOptions = profiles.map((p) => ({
    value: p.id,
    label: p.nome.split(" ")[0],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Currículo Express" subtitle="Visão Geral do Perfil" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />}
      >
        {profiles.length > 1 && (
          <View style={styles.selectorContainer}>
            <Text variant="labelMedium" style={[styles.selectorLabel, { color: theme.colors.onSurfaceVariant }]}>
              Alternar Perfil Ativo:
            </Text>
            <SegmentedButtons
              value={perfilAtivoId}
              onValueChange={setPerfilAtivoId}
              buttons={profileOptions}
              style={styles.segmented}
            />
          </View>
        )}

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.profileHeader}>
            <Avatar.Text
              size={76}
              label={initials}
              style={{ backgroundColor: theme.colors.primary }}
              color="#FFFFFF"
            />
            <Text variant="headlineSmall" style={[styles.name, { color: theme.colors.onSurface }]}>
              {currentProfile?.nome}
            </Text>
            <Chip
              icon="briefcase"
              style={[styles.badge, { backgroundColor: theme.colors.surfaceVariant }]}
              textStyle={{ color: theme.colors.primary, fontWeight: "600" }}
            >
              {currentProfile?.cargo}
            </Chip>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Sobre Mim"
            titleVariant="titleMedium"
            left={(props) => <MaterialCommunityIcons {...props} name="account-details" size={24} color={theme.colors.primary} />}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={[styles.resumo, { color: theme.colors.onSurfaceVariant }]}>
              {currentProfile?.resumo || "Nenhum resumo cadastrado."}
            </Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Contato & Redes"
            titleVariant="titleMedium"
            left={(props) => <MaterialCommunityIcons {...props} name="card-account-mail" size={24} color={theme.colors.primary} />}
          />
          <Card.Content style={styles.contactList}>
            {currentProfile?.email && (
              <Button
                mode="text"
                icon="email"
                style={styles.contactButton}
                contentStyle={styles.contactButtonContent}
                onPress={() => openLink(`mailto:${currentProfile.email}`)}
              >
                {currentProfile.email}
              </Button>
            )}

            {currentProfile?.telefone && (
              <Button
                mode="text"
                icon="phone"
                style={styles.contactButton}
                contentStyle={styles.contactButtonContent}
                onPress={() => openLink(`tel:${currentProfile.telefone.replace(/\D/g, "")}`)}
              >
                {currentProfile.telefone}
              </Button>
            )}

            {currentProfile?.linkedin && (
              <Button
                mode="text"
                icon="linkedin"
                style={styles.contactButton}
                contentStyle={styles.contactButtonContent}
                onPress={() => openLink(currentProfile.linkedin)}
              >
                LinkedIn
              </Button>
            )}

            {currentProfile?.github && (
              <Button
                mode="text"
                icon="github"
                style={styles.contactButton}
                contentStyle={styles.contactButtonContent}
                onPress={() => openLink(currentProfile.github)}
              >
                GitHub
              </Button>
            )}
          </Card.Content>
        </Card>

        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.statContent}>
              <MaterialCommunityIcons name="school" size={28} color={theme.colors.primary} />
              <Text variant="titleLarge" style={{ fontWeight: "bold", marginTop: 4 }}>
                {currentProfile?.academicExperiences?.length || 0}
              </Text>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Formações
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.statContent}>
              <MaterialCommunityIcons name="briefcase" size={28} color={theme.colors.primary} />
              <Text variant="titleLarge" style={{ fontWeight: "bold", marginTop: 4 }}>
                {currentProfile?.professionalExperiences?.length || 0}
              </Text>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Experiências
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.statContent}>
              <MaterialCommunityIcons name="code-tags" size={28} color={theme.colors.primary} />
              <Text variant="titleLarge" style={{ fontWeight: "bold", marginTop: 4 }}>
                {currentProfile?.projects?.length || 0}
              </Text>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Projetos
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorLabel: {
    marginBottom: 6,
    fontWeight: "bold",
  },
  segmented: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 14,
  },
  name: {
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  badge: {
    marginTop: 8,
  },
  resumo: {
    lineHeight: 22,
  },
  contactList: {
    alignItems: "flex-start",
  },
  contactButton: {
    marginVertical: 2,
  },
  contactButtonContent: {
    justifyContent: "flex-start",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 12,
  },
});

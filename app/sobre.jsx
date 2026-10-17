import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Divider, List, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { API_BASE_URL } from "../services/api";

export default function SobreScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Sobre o Aplicativo" subtitle="Arquitetura & Especificações" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Currículo Express Mobile"
            subtitle="Programação para Dispositivos Móveis (2026.2)"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="cellphone-cog" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={[styles.paragraph, { color: theme.colors.onSurfaceVariant }]}>
              Aplicativo mobile desenvolvido em conformidade com o padrão arquitetural e boas práticas do repositório
              acadêmico da UNICAP. Apresenta o currículo e portfólio profissional de forma dinâmica, consumindo uma API REST
              em produção hospedada na Vercel e integrada ao PostgreSQL no NeonDB.
            </Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Tecnologias Utilizadas"
            subtitle="Stack e Bibliotecas do Projeto"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="layers-triple" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <List.Item
              title="React Native & Expo (v52+)"
              description="Framework base para desenvolvimento mobile multiplataforma."
              left={(props) => <List.Icon {...props} icon="react" color="#0EA5E9" />}
            />
            <Divider />
            <List.Item
              title="Expo Router (File-based Routing)"
              description="Navegação nativa e moderna estruturada por arquivos e abas (Tabs)."
              left={(props) => <List.Icon {...props} icon="routes" color="#6366F1" />}
            />
            <Divider />
            <List.Item
              title="React Native Paper (MD3)"
              description="Biblioteca de componentes baseada no Material Design 3 com suporte nativo a temas."
              left={(props) => <List.Icon {...props} icon="palette" color="#EC4899" />}
            />
            <Divider />
            <List.Item
              title="Zustand + AsyncStorage"
              description="Gerenciamento de estado global leve e persistente no dispositivo."
              left={(props) => <List.Icon {...props} icon="database" color="#F59E0B" />}
            />
            <Divider />
            <List.Item
              title="Axios HTTP Client"
              description="Comunicação assíncrona com tratamento de erros e timeouts com o back-end."
              left={(props) => <List.Icon {...props} icon="api" color="#10B981" />}
            />
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Funcionalidades Extras Implementadas"
            subtitle="Diferenciais técnicos adicionados"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="star-circle" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <List.Item
              title="1. Alternador de Tema (Dark/Light Mode)"
              description="Chave seletora no cabeçalho com persistência em tempo real via AsyncStorage e Zustand."
              left={(props) => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
            />
            <Divider />
            <List.Item
              title="2. Busca e Filtro em Tempo Real"
              description="Mecanismo de busca dinâmica por tecnologia ou título na Galeria de Projetos."
              left={(props) => <List.Icon {...props} icon="magnify" color={theme.colors.primary} />}
            />
            <Divider />
            <List.Item
              title="3. Sistema de Favoritos Local"
              description="Possibilidade de marcar projetos favoritos com persistência no armazenamento local."
              left={(props) => <List.Icon {...props} icon="star" color="#EAB308" />}
            />
            <Divider />
            <List.Item
              title="4. Alternador de Perfil em Produção"
              description="Seletor dinâmico que alterna entre os perfis cadastrados no NeonDB, atualizando todas as telas."
              left={(props) => <List.Icon {...props} icon="account-switch" color={theme.colors.primary} />}
            />
          </Card.Content>
        </Card>

        <Card mode="elevated" style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Informações do Projeto"
            left={(props) => (
              <MaterialCommunityIcons {...props} name="information-outline" size={28} color={theme.colors.primary} />
            )}
          />
          <Card.Content>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>API em Produção:</Text> {API_BASE_URL}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>Desenvolvedor:</Text> Samuel Sousa
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>Instituição:</Text> Universidade Católica de Pernambuco (UNICAP)
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              <Text style={{ fontWeight: "bold" }}>Disciplina:</Text> Programação para Dispositivos Móveis (PDM 2026.2)
            </Text>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 14,
    borderRadius: 14,
  },
  paragraph: {
    lineHeight: 22,
  },
});

import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response.data);
      setRespositories(response.data);
    })
  }, [])

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories[repositoryIndex] = response.data;

    setRespositories([...repositories]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3B4259" />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Lista de Repositorios</Text>
        </View>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => (

            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (<Text key={tech} style={styles.tech}>{tech}</Text>))}
              </View>

              <View style={styles.likesContainer}>
                <Text style={styles.likeText} testID={`repository-likes-${repository.id}`}>
                  {repository.likes} curtida{repository.likes > 1 ? 's' : ''}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B4259",
  },
  topContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  topText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A1D979'
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#D93D86'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between'
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#A1D979",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: '#d93d86'
  },
  button: {
    marginTop: 10,
    alignItems: 'flex-start'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3B4259",
    padding: 15,
    width: 120
  },
});

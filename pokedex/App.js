import { StyleSheet, Text, TextInput, View, Image, Button, FlatList, Alert} from 'react-native';
import { useState, useMemo } from 'react';
import  styles from './Styles/styles';

export default function App() {
  const [nombreP, setNombreP] = useState("");
  const [tipoP, setTipoP] = useState("");
  const [urlP, setUrlP] = useState("");
  const [listaPok, setListaPok] = useState([]);
  
  const agregarPokemon = () => {
    const nuevoPokemon = {
      id: Date.now().toString(),
      nombre: nombreP.trim(),
      tipo: tipoP.trim(),
      url: urlP.trim(),
      atrapado: false,
  };
  setListaPok(prev => [nuevoPokemon, ...prev]);
  setNombreP("");
  setTipoP("");
  setUrlP("");
  };

  const setAtrapado = (id) => {
    setListaPok(prev => prev.map(p => (p.id === id ? {...p, atrapado: !p.atrapado } : p)));
  };

  const atrapados = useMemo(() => listaPok.filter(p => p.atrapado).length, [listaPok]);
  const registrados = listaPok.length;

   const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.url }}
        style={styles.img}
        resizeMode="cover"
        onError={() => Alert.alert('Imagen no cargó', `Revisa la URL:\n${item.url}`)}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.nombre, item.atrapado && styles.capturadoTexto]}>
          {item.nombre}
        </Text>
        <Text style={[styles.tipo, item.atrapado && styles.capturadoTexto]}>
          {item.tipo}
        </Text>

        <Button
        title='Atrapado'
          style={[styles.btnAtrapado, item.atrapado && styles.btnAtrapadoOn]}
          onPress={() => setAtrapado(item.id)}
        />
      </View>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Total registrados: {registrados}</Text>
      <Text style={styles.footerText}>Total atrapados: {atrapados}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <Text style= {styles.title}>Pokedex</Text>
      </View>
      <View style = {styles.inputContainer}>
        <Text style = {styles.label}>Ingresa el nombre del pokemon</Text>
        <TextInput 
          style = {styles.input} 
          placeholder="Pikachu"
          value={nombreP}
          onChangeText={setNombreP}/>
         <Text styles = {styles.label}>Ingresa el tipo del pokemon</Text>
         <TextInput 
          style = {styles.input}
          placeholder="Electrico"
          value={tipoP}
          onChangeText={setTipoP}/>
          <Text styles = {styles.label}>Ingresa la url de la imagen</Text>
          <TextInput
          style = {styles.input}
          placeholder = "imagen https://"
          value= {urlP}
          onChangeText={setUrlP}/>

        <Button title = "Agregar Pokemon" onPress= {agregarPokemon}/>

        <FlatList
        data={listaPok}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={Footer}
      />
      </View>
    </View>
  );
}

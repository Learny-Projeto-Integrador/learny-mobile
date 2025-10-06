import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import CharacterSprite from '@/components/ui/Children/CharacterSprite';

const { width, height } = Dimensions.get('window');

interface ObjectItem {
  id: string;
  position: [number, number];
}

export default function AtvBossScreen() {
  const [target, setTarget] = useState<[number, number] | undefined>(undefined);

  // Lista de objetos na tela
  const objects: ObjectItem[] = [
    { id: 'obj1', position: [100, 200] },
    { id: 'obj2', position: [250, 400] },
    { id: 'obj3', position: [50, 500] },
  ];

  return (
    <View style={styles.container}>
      {/* Personagem */}
      <CharacterSprite
        sprite="boy"
        direction="down"
        position={[50, 50]}
        target={target}
      />

      {/* Objetos clicáveis */}
      {objects.map((obj) => (
        <TouchableOpacity
          key={obj.id}
          style={[
            styles.object,
            { left: obj.position[0], top: obj.position[1] },
          ]}
          onPress={() => setTarget(obj.position)}
        >
          <Text style={styles.objectText}>{obj.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cceeff',
  },
  object: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#ffcc66',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

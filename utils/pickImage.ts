import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export async function pickImage(): Promise<string | null> {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const originalUri = result.assets[0].uri;
    const filename = originalUri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${filename}`;

    try {
      await FileSystem.copyAsync({ from: originalUri, to: newPath });
      return newPath;
    } catch (error) {
      console.error("Erro ao copiar a imagem:", error);
      return null;
    }
  }

  return null;
}

import { categorires } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";


export function Categories() {
  return (
    <FlatList
      data={categorires}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Category
          icon={item.icon}
          name={item.name}
          isSelected={false}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}
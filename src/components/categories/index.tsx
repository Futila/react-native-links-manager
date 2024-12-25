import { categorires } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";


type CategoriesProps = {
  selected: string, 
  onChange: (category: string) => void
}

export function Categories({selected, onChange}: CategoriesProps) {
  return (
    <FlatList
      data={categorires}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Category
          icon={item.icon}
          name={item.name}
          isSelected={item.name === selected}
          onPress={() => onChange(item.name)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}
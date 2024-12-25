import {Image, Text, TouchableOpacity, View} from "react-native"

import { styles } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Category } from "@/components/category"
import { categorires } from "@/utils/categories"

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
        />

        <TouchableOpacity>
          <MaterialIcons name="add" size={32} color={colors.green[300]}/>
        </TouchableOpacity>
      </View>

      <Category name={categorires[0].name} icon={categorires[0].icon} isSelected/>
      <Category name="Site" icon="language" isSelected={false}/>
      <Category name="Vídeo" icon="movie" isSelected={false}/>
    </View>
  )
}
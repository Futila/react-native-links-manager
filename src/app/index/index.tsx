import {Alert, Image, Modal, Text, TouchableOpacity, View} from "react-native"

import { styles } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Categories } from "@/components/categories"
import { Link } from "@/components/link"
import { FlatList } from "react-native"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { categorires } from "@/utils/categories"
import { linkStorage, LinkStorage } from "@/storage/link-storage"

export default function Index() {
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categorires[0].name)
  

  async function fetchlinks() {
    try {
      const response = await linkStorage.get();
      setLinks(response)
      console.log(response)

    }catch(error){
      Alert.alert("Erro", "Não foi possível listar os links")

    }
  }

  useEffect(()=> {
    fetchlinks()

  }, [category])
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
        />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]}/>
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category}/>

      <FlatList
        data={links}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Link 
          name={item.name}
          url={item.url}
          onDetails={() => console.log("Clicou")}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={false} >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <MaterialIcons name="close" size={20} color={colors.gray[400]} />
             
            </View>

            <Text style={styles.modalLinkName}>Rocketseat</Text>


            <Text style={styles.modalUrl}>https://www.rocketseat.com.br/</Text>
          </View>
        </View>
      </Modal>

    </View>
  )
}
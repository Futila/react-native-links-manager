import {Alert, Image, Modal, Text, TouchableOpacity, View} from "react-native"

import { styles } from "./styles"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"


import { Categories } from "@/components/categories"
import { Link } from "@/components/link"
import { Option } from "@/components/option"


import { FlatList } from "react-native"

import { router, useFocusEffect } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { categorires } from "@/utils/categories"
import { linkStorage, LinkStorage } from "@/storage/link-storage"

export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [link, setlink] = useState<LinkStorage>({} as LinkStorage)
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categorires[0].name)
  

  async function getlinks() {
    try {
      const response = await linkStorage.get();
      const filteresLinks = response.filter((link) => link.category === category)
      
      setLinks(filteresLinks)
      

    }catch(error){
      Alert.alert("Erro", "Não foi possível listar os links")

    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true)
    setlink(selected)
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id)
      getlinks()
      setShowModal(false)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir")
      console.log(error);    
    }
  }

  async function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir?", [
      { style: "cancel", text: "Não" },
      { text: "Sim", onPress: linkRemove },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      getlinks()
    }, [category])
  )
  
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
          onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide" >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
              <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
             
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>


            <Text style={styles.modalUrl}>{link.url}</Text>
            <View style={styles.modalFooter}>
              
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove} />
              <Option name="Abrir" icon="language" />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}
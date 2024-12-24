import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { styles } from './styles'

export function Category() {
    return (
      <Pressable style={styles.container}>
        <MaterialIcons name='code' size={16} color={colors.gray[400]}/>
        <Text style={styles.name}>Projetos</Text>
      </Pressable>
    )
}
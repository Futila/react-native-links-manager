import { Pressable, PressableProps, Text, View } from 'react-native'
import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { styles } from './styles'



type Props = PressableProps & {
  name: string, 
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Category({name, icon, ...rest}: Props) {
    return (
      <Pressable style={styles.container}>
        <MaterialIcons name={icon} size={16} color={colors.gray[400]}/>
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    )
}
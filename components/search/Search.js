import React from 'react'
import { Appbar, useTheme } from "react-native-paper";

function Search() {
  const them = useTheme()
  return (
    <Appbar.Header style={{ backgroundColor: them.colors.secondary }}>
    <Appbar.Content title="Search" />
  </Appbar.Header>
  )
}

export default Search
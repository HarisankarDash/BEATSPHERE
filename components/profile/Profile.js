import React from 'react'
import { Appbar, useTheme } from "react-native-paper";
function Profile() {
  const them = useTheme()
  return (
    <Appbar.Header style={{ backgroundColor: them.colors.secondary }}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
  )
}

export default Profile
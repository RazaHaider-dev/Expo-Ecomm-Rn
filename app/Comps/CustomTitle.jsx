import React from 'react'
import { Text, View } from 'react-native';

function CustomTitle({title,txt}) {
  return (
    <>
    <View>
        
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
    <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black',fontFamily:'Poppins-bold' }}>
      {title}
    </Text>
    <Text style={{ fontWeight: 900, fontSize: 25, color: 'red'  }}>
      .
    </Text>
  </View>
  <Text style={{marginBottom:10}}>{txt}</Text>

    </View>

    </>
  )
}

export default CustomTitle

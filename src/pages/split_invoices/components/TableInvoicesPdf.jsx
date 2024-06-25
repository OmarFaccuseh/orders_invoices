import React, { Component, Fragment, useContext, useState, useEffect} from "react";
import { Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";


export default function Table(itemsRes){
  const [groups, setGroups] = useState([]) 
  
  useEffect(()=>{
    setGroups( () => itemsRes.items )
  })

  return (
    <Fragment>
    <View style={styles.tableContainer}>
    {groups.map((group, i ) => {
      const name = group.group_name;
      return(
        <View>
          <View style={styles.rowTitle}>
            <Text>GROUP NAME: </Text>
            <Text>{name}</Text>
          </View>

          {/*<TableHeader />*/}
          <View style={styles.rowHead}>
            <Text style={styles.row1Head}>RFC</Text>
            <Text style={styles.row2Head}>Razon social</Text>
            <Text style={styles.row3Head}>Subtotal</Text>
            <Text style={styles.row4Head}>IVA</Text>
            <Text style={styles.row5Head}>Total</Text>
          </View>
          {group.invoices.map((invoice, i) => {
            return (
              <View style={styles.row} key={Math.floor(Math.random() * 100 * i).toString()}>
                <Text style={styles.row1}>{invoice['cfdi:Emisor'][0].attributes.Rfc}</Text>
                <Text style={styles.row2}>{invoice['cfdi:Emisor'][0].attributes.Nombre}</Text>
                <Text style={styles.row3}>{invoice['attributes'].SubTotal}</Text>
                <Text style={styles.row4}>{ Math.round( (invoice['attributes'].Total - invoice['attributes'].SubTotal) *100)/100}</Text>
                <Text style={styles.row5}>{invoice['attributes'].Total}</Text>
              </View>
            )})
          }
          <View style={styles.rowTotal} key={i}>
            <Text>Totales: </Text>
            <Text style={styles.row3}>{group.subtotal}</Text>
            <Text style={styles.row4}>{group.iva}</Text>
            <Text style={styles.row5}>{group.total}</Text>
          </View>
        </View>
      )
    })
    }
    </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({

  tableContainer: {
   flexDirection: "row",
   flexWrap: "wrap",
   padding: 10,
   fontSize: 7
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    display: 'flex',
  },
  rowTotal: {
    flexDirection: "row",
    justifyContent: "flex-end" ,
    width: '100%',
    display: 'flex',
        backgroundColor: '#D0D0D0',

  },
  rowTitle: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    display: 'flex',
    paddingLeft: 5, 
    paddingBottom: 5,
    paddingTop: 10,
  },
  rowHead: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    display: 'flex',
    borderTop: '1px solid #EEE',
    paddingLeft: 5, 
    paddingRight: 5,
    backgroundColor: '#D0D0D0',
    border: '1px solid #808080',
  },
  description: {
    width: "60%",
  },
  xyz: {
    width: "40%",
  },
  row1Head: {
    width: '15%',
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5, 
    paddingRight: 5,
    borderRight: '1px solid #808080',
  },
  row2Head: {
    width: '35%',
    textAlign: 'center', 
    borderRight: '1px solid #808080',   
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row3Head: {
    width: '15%',
    borderRight: '1px solid #808080',
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row4Head: {
    width: '15%',
    borderRight: '1px solid #808080',
    paddingTop:2,
    paddingBottom: 2,
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row5Head: {
    paddingTop:2,
    paddingBottom: 2,
    width: '20%',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row1: {
    width: '15%',
    fontWeight: 'bold',
    borderLeft: '1px solid #808080',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,  
  },
  row2: {
    width: '35%',
    textAlign: 'center',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row3: {
    width: '15%',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row4: {
    width: '15%',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
  row5: {
    width: '20%',
    borderRight: '1px solid #808080',
    borderBottom: '1px solid #808080',
    paddingLeft: 5, 
    paddingRight: 5,
  },
});

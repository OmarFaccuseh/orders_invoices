/* 
  read recursive all xml files & fill reduce_facts
  Reduce facts it's no longer used, object facts in place
*/

export default function readFile(index, xml_files, reduce_facts, filterFacts) {

    var readXml=null;
    var reader = new FileReader();

    if( index >= xml_files.length ){
      filterFacts()
      return; // ... break reading Files
    }
    var file = xml_files[index];

    reader.onload = function(e) {          
      
      readXml= e.target.result;    // string xml
      var parser = new DOMParser();
      var doc = parser.parseFromString(readXml, "application/xml");

      const ele_emisor = doc.getElementsByTagName("cfdi:Emisor")[0]  // htmlcollection list
      const ele_receptor = doc.getElementsByTagName("cfdi:Receptor")[0]  // htmlcollection list
      const ele_items = doc.getElementsByTagName("cfdi:Concepto")        // handled like array
      var ele_taxes = doc.getElementsByTagName('cfdi:Impuestos');
      var taxes_translate = 0;
      for(var i = 0; i < ele_taxes.length; i++){
          taxes_translate = Number(ele_taxes[i].getAttribute('TotalImpuestosTrasladados')); 
          if (taxes_translate > 0) {break;}
      }
      const attr_rfc_emisor = ele_emisor.getAttribute("Rfc")
      const attr_rfc_receptor  = ele_receptor.getAttribute("Rfc")
      const attr_name = ele_receptor.getAttribute("Nombre")
      const attr_name_emisor = ele_emisor.getAttribute("Nombre")
      const sum_subtotal = Array.from(ele_items).reduce((prev, curr) => prev + Number(curr.getAttribute("Importe")), 0);
      
      reduce_facts.push({"Rfc_emisor" : attr_rfc_emisor,
                         "Rfc_receptor": attr_rfc_receptor, 
                         "razon": attr_name, 
                         "razon_emisor" : attr_name_emisor,  
                         "nota_de_credito": (doc.getElementsByTagName("cfdi:CfdiRelacionados") ? true : false),                
                         "subtotal": sum_subtotal, 
                         "iva": taxes_translate, 
                         "total": sum_subtotal + taxes_translate,})     
                         /*
                         "RFC" : attr_rfc, 
                         "razon": attr_name, 
                         "subtotal": sum_subtotal, 
                         "iva": taxes_translate, 
                         "total": sum_subtotal + taxes_translate,*/
    
      readFile(index+1) // ...recursive call
    }
  reader.readAsText(file);
}
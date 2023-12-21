import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Font,} from "@react-pdf/renderer";
import React, { Component , useState, useEffect, useRef, useStateCallback} from "react";
import PdfReportInvoices from './components/PdfReportInvoices.jsx';
import PopHelp from './components/popHelpComponent.jsx';
import Navbar from '../../Navigation/Navbar.jsx'
import _ from "lodash";
import TableGroups from "./components/TableGroups.jsx";
import { editableInputTypes } from "@testing-library/user-event/dist/utils/index.js";

const styles = StyleSheet.create({  
  tableRadius: {
   borderRadius: "9px",
   overflow: "hidden" ,/* add this */
   borderCollapse: "separate",
   borderWidth : "3px"
  }
})

const resJoke = [{"name": "GP_1", "invoices": [{"RFC": "FERRE0390332", "razon": "FERRECSA", "subtotal": 772, "iva": 21, "total": 823},
                                               {"RFC": "TLA909801021", "razon": "TLAPALERO", "subtotal": 646, "iva": 14, "total": 730},],
                  "total": 7745
                },
                {"name": "GP_1", "invoices": [{"RFC": "MAR979832723", "razon": "CASAMARCUS", "subtotal": 72, "iva": 2, "total": 83},
                                              {"RFC": "AMZ83972918", "razon": "AMAZON", "subtotal": 956, "iva": 30, "total": 999},],
                  "total": 7745
                },]


export default function MakeFacts(){
  const [groups, setGroups] = useState([]);
  const [factsByGroup, setFactsByGroup] = useState([]); // guarda las reduce_facts del grupo, y sumatorias de estas.
  const [xml_files, setXmlFiles] = useState([]);
  const [popHelp,setPopHelp]=useState(false)
  const [popSelect,setPopSelect]=useState(false)
  const [configs,setConfigs]=useState(false)  // recover config groups from backend
  const [nodesTags, setNodesTags] = useState([])
  const [node, setNode] = useState()
  const [attr, setAttr] = useState()
  const [nodeAttrs, setNodeAttrs] = useState([])
  const [valuesVariety, setValuesVariety] = useState([])



  var res = []
  const pdfComp = useRef();

  var reduce_facts = [  // guarda solo ciertos campos , TODO: hacerlo hook? no por ahora
    //{"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
    //{"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
    //{"RFC": "ADWADAF122321", "razon": "Nombre de la empresa", "subtotal": 1234, "iva" : 45, "total" : 21346 },
  ];

  useEffect(()=>{
    setGroups(currGroups => {
      // slice copia el arreglo, splice borra desde hasta, y agrega 3er arg. 
      let newArray = currGroups.slice()
      newArray.splice(0, 0, { name : 'default_group',  criteria : [{'field' : 'emisor',  'operator' : '=',  'value' : 'Ferrecsa'}] });
      return newArray;
    })
  },[]);

  useEffect(()=> {
    getTags()
  }, [xml_files])


  function onChangeFiles (event){
    setXmlFiles(event.target.files);
  }

  function onNewCriterion (name, event){
    setGroups(currGroups => {
      return currGroups.map((grupo, index) => {
        if (name == grupo.name){
          let newArray = grupo.criteria.slice()
          newArray.splice(newArray.length, newArray.length, { 'field' : 'new',  'operator' : '=',  'value' : 'new' });
          return {...grupo, criteria: newArray} // unecesary
        }
        else {
            return grupo;
        }
      })
    })
  }

  function onNewGroup (name, criteria){
    setGroups(currGroups => {
      let newArray = currGroups.slice()
      newArray.splice(newArray.length, newArray.length, { name : name || 'GGGGGG',
                              criteria : criteria || [{'field' : '',  'operator' : '',  'value' : ''}]
      });
      return newArray;  // unecesary
    })
  }

  function onDelGroup(indexGroup, event){
    setGroups( currGroups => {
      let newArray = currGroups.slice()
      newArray.splice(indexGroup, 1);
      return newArray;  // unecesary
    });
  }

  function onChangeCriterion(namePartCriterion, nameGroup, indexCriterion, event){
    console.log('onchangecriterion event')
    console.log(event)
    setGroups( groups => {
      return groups.map((group) => {
        if (nameGroup == group.name){
          let newArrayCriteria = group.criteria.slice()
          // antes de asignar valor llamar a validatecriterion ?
          newArrayCriteria[indexCriterion][namePartCriterion] = event.target.value
        }
        else {
            return group;
        }
      })
    });
  }

  function validateCriterion(group, newCriterion){  // FIXME
    let f = newCriterion.field;
    let o = newCriterion.operator;
    let v = newCriterion.value;

    if (!f || !o){
      console.log("FALSE: FIELD or OPERATOR")
       return false;
    }
    if (group.criteria.some(c => _.isEqual(c, newCriterion))){   // can't exist twice criterion
              console.log(group.criteria)
              console.log(newCriterion)
       console.log("FALSE: TWICE CRITERION")
       return false;
    }
    return true
  }

  function onChangeNameGroup(ind, event){
    setGroups( currGroups => {
      return currGroups.map((grupo, index) => {
        if (ind == index){
          return {...grupo, name : event.target.value}
        }
        else {
            return grupo;
        }
      })
    });
  }

  function onDelCriterion(indexGroup, indexCriterion, event){
    setGroups( groups => {
      return groups.map((group, index) => {
        if (index == indexGroup){
          let newArray = group.criteria.slice()
          newArray.splice(indexCriterion, 1);
          return {...group, criteria : newArray }
        }
        else {
          return group;
        }
      })
    });
  }

  function generate(event){   // FIXME: this should be in backend
    
    var readXml=null;
    var reader = new FileReader();

    // read recursive all xml files & fill reduce_facts
    function readFile(index) {

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
        const attr_name = ele_customer.getAttribute("Nombre")
        const sum_subtotal = Array.from(ele_items).reduce((prev, curr) => prev + Number(curr.getAttribute("Importe")), 0);
        
        reduce_facts.push({"Rfc_emisor" : attr_rfc_emisor,
                           "Rfc_receptor": attr_rfc_receptor, 
                           "razon": attr_name, 
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
    readFile(0);

    // filter by criteria's groups
    function filterFacts(){
      
      groups.map((group, index,) => {

        function satisfyCriteria(fact) {   // Need satisfy all criterion
          
          var satisfy = true;        
          console.log("CRITERIA : " + i + "  " + JSON.stringify(group.criteria))    
          for(var i=0; i < group.criteria.length; i++){            
            const field_criterion =  isNaN(group.criteria[i].field) ? group.criteria[i].field : Number(group.criteria[i].field )    
            const operator_criterion =  group.criteria[i].operator 
            const value_criterion =  isNaN(group.criteria[i].value) ? group.criteria[i].value : Number(group.criteria[i].value)  

            if ( isNaN(value_criterion) && operator_criterion != "=" ){
              console.log("Los operadores '<' y '>' solo se pueden validar si el criterio es numero, si no, incuplira el criterio")
              satisfy = false;
              break;
            }

            switch (operator_criterion) {
              case "=":
                if (fact[field_criterion] !== value_criterion){
                  satisfy = false;
                }
                break;
              case ">":
                if (fact[field_criterion] <= value_criterion){
                  satisfy = false;
                }
                break;
              case "<":
                if (fact[field_criterion] >= value_criterion){
                  satisfy = false;
                }
                break;
              default:
                break;
            }
          }
          return satisfy;
        }

        const group_facts = reduce_facts.filter(fact => satisfyCriteria(fact))
        const subtotal_facts = group_facts.reduce((prev, curr) => prev + curr.subtotal, 0);
        const iva_facts      = group_facts.reduce((prev, curr) => prev + curr.iva, 0);
        const total_facts    = group_facts.reduce((prev, curr) => prev + curr.total, 0);
        const obj_group = {"group_name": group.name, "invoices":group_facts, "subtotal": subtotal_facts,
                           "iva": iva_facts, "total": total_facts}
        setFactsByGroup(facts => {
                  let newArray = facts.slice();
                  newArray.splice(0, index==0 ? factsByGroup.length : 0 , obj_group);  // on first lap remove prev 
                  return newArray;
        }) 
      })
      console.log("facts by group:")
      console.log(factsByGroup)
    }
  }

  function getTags(){

    var readXml=null;
    var reader = new FileReader();  
    var file =xml_files[0]

    if( xml_files.length == 0){
      return
    }
    
    reader.onload = function(e) {          
      readXml= e.target.result;    // string xml
      var parser = new DOMParser();
      var nodee = parser.parseFromString(readXml, "application/xml").documentElement;
      var nodes = nodee.childNodes;
      setNodesTags(nodes)
    }
    reader.readAsText(file);
  }

  function onChangeTag(e){    
    setNode(e.target.value)

    console.log("NODE CHANGE TO: ", node)

    Array.from(nodesTags).forEach(n => {
      if(n.tagName == e.target.value){
        setNodeAttrs(n.getAttributeNames())
        console.log('NODE ATTRS: ', n.getAttributeNames() )
      }
    })
  }
  function onChangeAttr(e){    
    setAttr(e.target.value)
    console.log("ATTR CHANGE TO: ", attr)
  }

  function autogenerate_goups(){
    const tag = node
    const attribute = attr
    let valuesLocal = []

    var readXml=null;
    var reader = new FileReader();

    // read recursive all xml files & fill reduce_facts
    function readFile(index) {

      if( index >= xml_files.length ){
        return; // ... break reading Files
      }
      var file = xml_files[index];

      reader.onload = function(e) {          
        
        readXml= e.target.result;    // string xml
        var parser = new DOMParser();
        var doc = parser.parseFromString(readXml, "application/xml").documentElement;
        var nodes = doc.childNodes;
        
        Array.from(nodes).map( n => {
          if(n.tagName == node){
            const val = n.getAttribute(attribute)
            console.log('VALUE : ', val, '  INCLUDED: ', valuesVariety.includes(val) ? 'true' : 'false')
            if(!valuesLocal.includes(val)){
              valuesLocal.push(val)
              setValuesVariety(values => [...values, val])
            }
          }
        })  
        readFile(index+1) // ...recursive call
      }
      reader.readAsText(file);
    }
    readFile(0);
    
    console.log('valuesVariety: ', valuesVariety)

    valuesVariety.map(val => {
      onNewGroup((attr + val), [{'field' : attr,  'operator' : '=',  'value' : val}])
    })
     
  }
  function onPopHelp(){
    setPopHelp(!popHelp);
  }
  function onPopSelect(){
    setPopSelect(!popSelect);
  }
  function onPopSelect(){
    setPopSelect(!popSelect);
  }
  const onClosePop=()=>{
    setPopHelp(false)
    setPopSelect(false)
  }
  

  return (
    <div>
      <main className="container px-5">
      <div>
         <Navbar />
      </div>   
      <div>
      {
        popHelp?
        <PopHelp onClosePop={onClosePop}/> : ""
      }
      {
        popSelect?
        <PopHelp onClosePop={onClosePop} setConfigs={setConfigs}/> : ""
      }
      </div>

      <div class="d-flex  justify-content-center">
        <div class="d-flex justify-content-start">
          <h5 style={{"background":"#2c2c2c", "color":"gray"}} className="d-flex align-items-center my-4 px-2" onClick={(evnt)=>(onPopHelp(evnt))}>
            How work?
          </h5>
        </div>
        <h1 className="m-4">
          SPLIT INVOICES
          <small class="blockquote"> XML Files </small>
        </h1>
      </div>

      <div class="mb-3 d-flex " >
        <div class="mb-3 d-flex flex-column" style={{ "width": "100%" }}>
          <label for="formFiles" class="form-label" > Select XML Files </label>
          <input class="form-control" type="file" id="formFiles" multiple onChange={e=>onChangeFiles(e)} style={{ "width": "80%" }}/>
        </div>
        <div class="mb-3 d-flex flex-column " style={{ "width": "50%", "height": "50%", "justifyContent": "flex-end"  }}>
          <span class="mb-3"> Current Config: Config Name / No config saved yet</span>
          <div class="mb-3 d-flex flex-row ">
            <button class="btn btn-secondary m-1" id="select_save" onClick={e=>onPopSelect(e)}> Open groups </button>
            <button class="btn btn-secondary m-1" id="select_save" onClick={e=>onPopSelect(e)}> Save changes </button>
            <button class="btn btn-secondary m-1" id="select_save" onClick={e=>onPopSelect(e)}> Save new config </button>
          </div>
        </div> 
      </div> 

      <div>
        <select name="tag_name" id="tag_name" onChange={e => onChangeTag(e)}>
          {      
            Array.from(nodesTags).map(node => {
              var text = null;
              if (node.childNodes.length == 1 && node.childNodes[0].nodeType == 3) //if nodeType == text node
                text = node.textContent; //get text of the node
              return (<option key={node.tagName} > {node.tagName} </option>)
            })
          }
          
        </select>
        <select name="atrr_name" id="atrr_name" onChange={e=> onChangeAttr(e)}>
          { 
            nodeAttrs.map( attr => {
              return (<option key={attr} > {attr} </option>)
            })
          }       
        </select>
        <button onClick={e=>autogenerate_goups(e)}>Autogenerate Groups</button>

      </div>

      <TableGroups groups={groups} events={[onChangeNameGroup, onDelGroup, onNewCriterion, onChangeCriterion, onDelCriterion]} />

      <div class="d-flex col-12 mb-3 justify-content-end">
        <button onClick={(evnt)=>(onNewGroup(evnt))} class="btn btn-secondary" type="button" >
          New group 
        </button>
      </div>

      <div class="col-12 d-flex justify-content-center">
        <button onClick={(evnt)=>(generate(evnt))} class="btn btn-primary m-1" type="button">
          Generate info 
        </button>
        <button onClick={(evnt)=>(generate(evnt))} class="btn btn-primary m-1 btn-secondary" type="button">
          Save data 
        </button>
      </div>

      <div id="doc-facts-gp" >
        {factsByGroup ? <PdfReportInvoices res={factsByGroup} /> : <p>Loading...</p>}   //regresame tu DOM en esta var
      </div>

      </main>
    </div>
  )
}


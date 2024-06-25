import React, { useEffect, useState } from "react";
import {StyleSheet} from "@react-pdf/renderer";


export default function TableGroups(props){
  const [groups, setGroups] = useState(props.groups);   
  const [onChangeNameGroup, onDelGroup, onNewCriterion, onChangeCriterion, onDelCriterion] = props.events
  console.log('Groups arrived to table:')
  console.log(groups)

  useEffect(() => {
    setGroups(props.groups);
  },[props.groups]);


  return(
      <div class="mb-3">
      <h3 class="m-4"> GRUPOS </h3>
      <table class="table table-bordered" id="groups" style={styles.tableRadius}>
        <tbody>
        {
          groups.map((group, indexGp)=>{
            if (group == undefined) return
            
            const {name, criteria} = group;
            
            return(
              <tr key={Math.floor(Math.random() * 1000).toString()} style={styles.margin}  >
                <td  style={styles.tableRadius} class="">
                  <div class=" col-12 d-flex p-2">
                    <input type="text" defaultValue={name} onChange={(evnt)=>(onChangeNameGroup(indexGp, evnt))} class="border-0 col-11" /> 
                    <button type="button" class="btn btn-warning col-1" onClick={(e) => (onDelGroup(indexGp, e))}> Delete </button>
                  </div>
                  <p name="criteria_label" type="text"> Criteria </p>

                  <table class="table table-bordered" id="criteria_by_group" >
                    <thead class="table-success">
                      <tr class='col-12 '>
                        <th scope="col" style={{"width": "25%"}}>NODE NAME</th>
                        <th scope="col" style={{"width": "15%"}}>COMPARE IF</th>
                        <th scope="col" style={{"width": "20%"}}>ATTR NAME</th>
                        <th scope="col" style={{"width": "10%"}}>IS</th>
                        <th scope="col" style={{"width": "25%"}}>VALUE</th>
                        <th scope="col" style={{"width": "5%"}}> </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      criteria.map((criterion, index) => {
                      const {node_name, compare_if, field, operator, value} = criterion;
                      return(
                        <tr key={Math.floor( Math.random() * 100 * index).toString() }> 
                          <td> <input type="text" defaultValue={node_name} class="border-0" onChange={ e => onChangeCriterion("node_name", name, index, e) } style={{"width": "100%"}}/> </td>
                          <td> 
                            <select defaultValue={compare_if} class="form-select" onChange={ e => onChangeCriterion("compare_if", name, index, e) } style={{"width": "100%"}}>
                              <option value="exists" >exists</option>
                              <option value="not_exists" >not_exists</option>
                              <option value="attr_value">attr_value</option>
                            </select>
                          </td>
                          <td> <input type="text" defaultValue={field} onChange={ e => onChangeCriterion("field", name, index, e) } class="border-0" 
                                      style={{"width": "100%", "color": (compare_if == "exists" || compare_if == "not_exists") ? "gray" : "white"}} readOnly={(compare_if == "exists") ? true : false } /> 
                          </td>
                          <td> 
                            <select class="form-select" defaultValue={operator} onChange={ e => onChangeCriterion("operator", name, index, e) } 
                                    style={{"width": "100%", "background": (compare_if == "exists" || compare_if == "not_exists") ? "gray" : "white", "pointerEvents" : (compare_if == "exists" || compare_if == "not_exists") ? "none" : "auto"}} >
                              <option value="=" >=</option>
                              <option value=">">&gt;</option>
                              <option value="<">&lt;</option>
                            </select>
                          </td>
                          <td> <input type="text" defaultValue={value} onChange={ e => onChangeCriterion("value", name, index, e ) } class="border-0" 
                                      style={{"width": "100%", "color": (compare_if == "exists" || compare_if == "not_exists") ? "gray" : "white"}} readOnly={(compare_if == "exists") ? true : false }/>
                          </td>
                          <td> <button type="button" class="btn btn-danger" onClick={ e => onDelCriterion(indexGp, index, e) } style={{"width": "100%"}}>X</button> </td>
                        </tr>  
                      )
                      })
                    }
                    </tbody>
                  </table>  
                  <div class="d-flex justify-content-end">
                  <button id="select_xmls" onClick={ e => onNewCriterion(name, e) } class="btn btn-dark" type="button" aria-expanded="false" style={{"align" : "right"}}>
                    New Criterion 
                  </button>
                  </div>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
  </div> 
  )
}

const styles = StyleSheet.create({  
  tableRadius: {
    display : "flex",
    flexDirection: "column",
    borderRadius: "10px",
    overflow: "hidden" ,/* add this */
    borderCollapse: "separate",
    borderWidth : "3px",
    borderColor : "#978715",
    padding : "13px",
  }
  ,
  margin : {
    display : "block",
    marginBottom : "10px",
    border: "none"
  }
})